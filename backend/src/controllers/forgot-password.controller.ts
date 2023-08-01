import { Request, Response } from "express";
import { RecoveryTokenModel } from "../models/RecoveryToken.model";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/secret-key";
import { handleError } from "../utils/handleError";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";

require("dotenv").config();

const recoveryTokenModel = new RecoveryTokenModel();
const userModel = new UserModel();

export class ForgotPasswordController {
  constructor() {
    this.createToken = this.createToken.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async createToken(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({
        message: "Please send email to password recovery.",
      });
      return;
    }
    const user = await userModel.getUserWithEmail(email);

    if (!user) {
      res.status(404).send({
        message: "User does not exist.",
      });
      return;
    }
    const token = await recoveryTokenModel.getToken(user.id);

    if (token) {
      await recoveryTokenModel.deleteToken(user.id);
    }

    const resetToken = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: 3600,
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });

    await recoveryTokenModel.createToken(user.id, resetToken);
    const link = `${process.env.CLIENT_URL}/forgotPassword?token=${resetToken}&id=${user.id}`;

    sendEmail(
      email,
      "Recuperação de Senha",
      "../templates/email/forgotPassword.handlebars",
      { name: user.name, link }
    )
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
  }

  async resetPassword(req: Request, res: Response) {
    const { password, token, id } = req.body;

    if (!password || !token || !id) {
      handleError(res, 400, "Password, token and id is required.");
    }

    const passwordRecoveryToken = await recoveryTokenModel.getToken(id);

    if (!passwordRecoveryToken) {
      handleError(res, 400, "Invalid or expired password reset token");
      return;
    }

    jwt.verify(String(token), SECRET_KEY, (err) => {
      if (err) {
        handleError(res, 400, "Invalid or expired password reset token");
        return;
      }
    });

    const hash = bcrypt.hashSync(password, 8);

    const user = await userModel.updatePassword(id, hash);

    if (!user) {
      handleError(res, 500, "Failed to update password");
      return;
    }

    await recoveryTokenModel.deleteToken(id);

    sendEmail(
      user.email,
      "Sua senha foi alterada",
      "../templates/email/passwordReseted.handlebars",
      { name: user.name }
    );
    res.sendStatus(200);
  }
}
