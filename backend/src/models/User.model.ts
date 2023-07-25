import { User } from "@prisma/client";
import prisma from "../database/prisma";

export type UserInput = Pick<User, "email" | "name" | "password">;

interface IUser {
  getUserWithEmail: (email: string) => Promise<User | null>;
  createUser: (user: UserInput) => Promise<User | null>;
}

export class UserModel implements IUser {
  async getUserWithEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(user: UserInput) {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  }
}
