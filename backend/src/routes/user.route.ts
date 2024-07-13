import { Router } from "express";
import * as user from "../controllers/user.controller";
import * as schemas from "../schemas/user.schema";
import { validateSchema } from "../middlewares/validateSchema";
import { auth } from "../middlewares/auth";

const router: Router = Router();

router.post(
  "/auth/register",
  validateSchema(schemas.registerSchema),
  user.register
);
router.post("/auth/login", validateSchema(schemas.loginSchema), user.login);
router.put(
  "/update",
  [auth, validateSchema(schemas.updatedUserSchema)],
  user.updateAccount
);
router.delete("/remove", auth, user.deleteAccount);

export default router;
