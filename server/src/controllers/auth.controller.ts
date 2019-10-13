import { Request, Response } from "express";

export default class AuthController {
  /**
   * Redirect request to application root
   * @param req Request object sent from the browser
   * @param res Response object that will be sent back to the browser
   */
  public redirect = (req: Request, res: Response) => {
    try {
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ error: "Unable to redirect" });
    }
  };
}
