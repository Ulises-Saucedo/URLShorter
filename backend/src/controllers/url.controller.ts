import { Request, Response } from "express";
import { AuthRequest } from "../ts/interfaces/auth.interface";
import { UrlBody, UrlFormatted } from "../ts/types/url.type";
import Url from "../models/url.model";
import UrlTtl from "../models/urlTtl.model";
import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 6 });

export const saveUrl = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;
  let body: UrlBody | UrlFormatted = req.body;

  body = { ...body, shortURL: randomUUID(), user: user?.id };

  try {
    const url = new Url(body);

    const savedUrl = await url.save();

    return res.status(201).json({
      status: 200,
      url: savedUrl,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};

export const saveTtl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let body: UrlBody | UrlFormatted = req.body;

  body = { ...body, shortURL: randomUUID() };

  try {
    const url = new UrlTtl(body);

    const savedUrl = await url.save();

    return res.status(201).json({
      status: 200,
      url: savedUrl,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};

export const redirectToOriginalUrl = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({
      shortURL: shortUrl,
    });
    if (url) return res.status(301).redirect(url.originalURL);

    const ttl = await UrlTtl.findOne({
      shortURL: shortUrl,
    });
    if (ttl) return res.status(301).redirect(ttl.originalURL);

    return res.status(404).json({
      status: 404,
      message: "URL no encontrada.",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};

export const update = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;
  const { shortUrl } = req.params;
  const { originalURL } = req.body;

  try {
    const url = await Url.findOne({
      shortURL: shortUrl,
      user: user?.id,
    });
    if (!url)
      return res.status(404).json({
        status: 404,
        message: "URL no encontrada.",
      });

    url.originalURL = originalURL;
    const updatedUrl = await url.save();

    return res.json({
      status: 200,
      url: updatedUrl,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;
  const { shortURL } = req.params;

  try {
    const url = await Url.findOneAndDelete({
      shortURL: shortURL,
      user: user?.id,
    });
    if (!url)
      return res.status(404).json({
        status: 404,
        message: "URL no encontrada.",
      });

    return res.status(204).json({
      status: 204,
      message: "URL eliminada correctamente.",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};

export const list = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;
  const { page, limit } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 10,
  };

  try {
    const urls = await Url.paginate(
      {
        user: user?.id,
      },
      options
    );

    return res.json({
      status: 200,
      urls: urls.docs,
      total: urls.totalDocs,
      pages: urls.totalPages,
      page: urls.page,
      limit: urls.limit,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Ha ocurrido un error, intentelo más tarde.",
    });
  }
};
