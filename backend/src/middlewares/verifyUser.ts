import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../constants/secret-key";
import { UserModel } from "../models/User.model";
import { GoogleUserModel } from "../models/GoogleUser.model";
import { userDecodeToken } from "../utils/userDecodeToken";

const userModel = new UserModel();
const googleUserModel = new GoogleUserModel();

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]!;

  const id = userDecodeToken(token);

  req.body.id_user = id;

  const googleUser = await googleUserModel.getUserById(id);

  if (googleUser) {
    req.body.provider = "Google";
    next();
    return;
  }

  const user = await userModel.getUserById(id);

  if (!user) {
    res.status(401).send({
      message: "Unauthorized!",
    });
    return;
  }

  req.body.provider = "Wanga";

  next();
};
