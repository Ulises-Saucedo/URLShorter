import { Router } from "express";
import * as url from "../controllers/url.controller";
import { urlSchema } from "../schemas/url.schema";
import { validateSchema } from "../middlewares/validateSchema";
import { auth } from "../middlewares/auth";

const router: Router = Router();

router.post("/save", [auth, validateSchema(urlSchema)], url.saveUrl);
router.post("/ttl", validateSchema(urlSchema), url.saveTtl);
router.get("/redirect/:shortUrl", url.redirectToOriginalUrl);
router.put("/update/:shortUrl", [auth, validateSchema(urlSchema)], url.update);
router.delete("/remove/:shortUrl", auth, url.remove);
router.get("/list", auth, url.list);

export default router;
