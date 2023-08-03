import { PushToken as PushTokenType } from "@prisma/client";
import prisma from "../database/prisma";

interface IPushToken {
  getAllTokens: () => Promise<PushTokenType[] | null>;
  deleteToken: (token: string) => Promise<PushTokenType | null>;
  addToken: (token: string) => Promise<PushTokenType | null>;
  getToken: (token: string) => Promise<PushTokenType | null>;
}

export class PushToken implements IPushToken {
  async getAllTokens() {
    const tokens = await prisma.pushToken.findMany();

    return tokens;
  }

  async deleteToken(token: string) {
    return await prisma.pushToken.delete({
      where: {
        token,
      },
    });
  }

  async addToken(token: string) {
    const newToken = await prisma.pushToken.create({
      data: {
        token,
      },
    });

    return newToken;
  }

  async getToken(token: string) {
    const currentToken = await prisma.pushToken.findUnique({
      where: {
        token,
      },
    });

    return currentToken;
  }
}
