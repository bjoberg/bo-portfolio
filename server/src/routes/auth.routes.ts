import { RequestHandler, Router } from "express";
import passport from "passport";

import AuthController from "../controllers/auth.controller";

const authRouter = Router();
const controller = new AuthController();

authRouter
  .route("/google/login")
  .get(passport.authenticate("google") as RequestHandler);

authRouter
  .route("/google/redirect")
  .get(passport.authenticate("google") as RequestHandler, controller.redirect);

export { authRouter };
