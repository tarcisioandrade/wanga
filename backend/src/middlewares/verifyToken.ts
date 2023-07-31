import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../constants/secret-key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    next();
  });
};
