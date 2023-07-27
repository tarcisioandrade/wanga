import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/secret-key";
import { GoogleUserModel } from "../models/GoogleUser.model";
import { GoogleUser } from "@prisma/client";

const userModel = new UserModel();
const googleUserModel = new GoogleUserModel();

export class AuthController {
  constructor() {
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.signinWithGoogle = this.signinWithGoogle.bind(this);
  }

  signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const passwordEncrypt = bcrypt.hashSync(password, 8);

    userModel
      .createUser({ name, email, password: passwordEncrypt })
      .then((user) => {
        res.send({ message: "User was registered successfully!" });
        return;
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }

  signin(req: Request, res: Response) {
    const { email, password } = req.body;

    userModel
      .getUserWithEmail(email)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "User Not found." });
          return;
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
          return;
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
        });

        res.status(200).send({
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }

  async signinWithGoogle(req: Request, res: Response) {
    const { email, name, id_google } = req.body;

    let user: GoogleUser | null;
    try {
      user = await googleUserModel.getUserWithEmail(email);

      if (!user) {
        user = await googleUserModel.createUser({ email, name, id_google });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
      });

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        accessToken: token,
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
}
