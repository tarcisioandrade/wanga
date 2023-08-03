import { Application as ApplicationType } from "@prisma/client";
import prisma from "../database/prisma";

interface IApplication {
  getApplication: () => Promise<ApplicationType | null>;
}

export class Application implements IApplication {
  async getApplication() {
    const application = await prisma.application.findFirst();

    return application;
  }
}
