import { GoogleUser } from "@prisma/client";
import prisma from "../database/prisma";

export type GoogleUserInput = Pick<GoogleUser, "email" | "name" | "id_google">;

interface IGoogleUser {
  getUserWithEmail: (email: string) => Promise<GoogleUser | null>;
  createUser: (user: GoogleUserInput) => Promise<GoogleUser | null>;
}

export class GoogleUserModel implements IGoogleUser {
  async getUserWithEmail(email: string) {
    const googleUser = await prisma.googleUser.findUnique({
      where: {
        email,
      },
    });

    return googleUser;
  }

  async createUser(user: GoogleUserInput) {
    const newUser = await prisma.googleUser.create({
      data: {
        ...user,
      },
    });

    return newUser;
  }
}
