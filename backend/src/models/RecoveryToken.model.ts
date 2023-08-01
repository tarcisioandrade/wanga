import { RecoveryToken } from "@prisma/client";
import prisma from "../database/prisma";

interface IRecoveryToken {
  createToken: (id_user: string, token: string) => Promise<RecoveryToken>;
  getToken: (id_user: string) => Promise<RecoveryToken | null>;
  deleteToken: (id: string) => Promise<RecoveryToken>;
}

export class RecoveryTokenModel implements IRecoveryToken {
  async createToken(id_user: string, token: string) {
    const newToken = await prisma.recoveryToken.create({
      data: {
        user_id: id_user,
        token,
      },
    });

    return newToken;
  }

  async getToken(id_user: string) {
    const token = await prisma.recoveryToken.findFirst({
      where: {
        user_id: id_user,
      },
    });

    return token;
  }

  async deleteToken(id_user: string) {
    const token = await prisma.recoveryToken.delete({
      where: {
        user_id: id_user,
      },
    });

    return token;
  }
}
