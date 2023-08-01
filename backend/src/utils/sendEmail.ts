import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

require("dotenv").config();

export const sendEmail = (
  email: string,
  subject: string,
  template: string,
  payload: Object
) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  const options = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: subject,
    html: compiledTemplate(payload),
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(options, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};
