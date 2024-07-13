import { Request, Response } from "express";
import { RegisterRequest } from "../ts/interfaces/register.interface";
import { AuthRequest } from "../ts/interfaces/auth.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/jwt";

export const register = async (
  req: RegisterRequest,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({
      email,
    });

    if (userExists)
      return res
        .status(400)
        .json({ status: 400, message: "El email ya está en uso" });

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      status: 201,
      message: "Usuario creado exitosamente",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: "Error al crear el usuario" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ status: 404, message: "El usuario no existe" });

    const isPasswordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({
        status: 400,
        message: "Credenciales incorrectas",
      });

    const token: string = await createToken({
      id: user._id.toString(),
    });

    return res.json({
      status: 200,
      message: "Sesión iniciada correctamente",
      token,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
};

export const updateAccount = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;
  const userUpdated = req.body;

  try {
    if (userUpdated.password) {
      const hashedPassword: string = await bcrypt.hash(
        userUpdated.password,
        10
      );

      userUpdated.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(user?.id, userUpdated, {
      new: true,
    });

    return res.json({
      status: 200,
      message: "Cuenta actualizada exitosamente",
      user: {
        id: updatedUser?._id.toString(),
        name: updatedUser?.name,
        email: updatedUser?.email,
      },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: "Error al actualizar el usuario" });
  }
};

export const deleteAccount = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const user = req.user;

  try {
    const deletedAccount = await User.findByIdAndDelete(user?.id);
    if (!deletedAccount)
      return res.status(404).json({
        status: 404,
        message: "No se encontró el usuario para eliminarlo",
      });

    return res.json({
      status: 200,
      message: "Cuenta eliminada exitosamente",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: "Error al eliminar el usuario" });
  }
};
