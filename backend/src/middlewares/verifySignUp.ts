import { NextFunction, Response, Request } from "express";
import { UserModel } from "../models/User.model";

const userModel = new UserModel();

export const checkDuplicateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userModel.getUserWithEmail(req.body.email).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! E-mail is already in use!",
      });
      return;
    }

    next();
  });
};
