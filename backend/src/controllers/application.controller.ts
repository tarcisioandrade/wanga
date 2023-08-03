import { Request, Response } from "express";
import { Application } from "../models/Application.model";

const applicationModel = new Application();

export class ApplicationController {
  constructor() {
    this.getApplication = this.getApplication.bind(this);
  }

  async getApplication(req: Request, res: Response) {
    applicationModel
      .getApplication()
      .then((app) =>
        res.status(200).json({
          application: app,
        })
      )
      .catch(() => res.sendStatus(500));
  }
}
