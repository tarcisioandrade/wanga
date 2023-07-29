import { Favorite } from "@prisma/client";
import prisma from "../database/prisma";

interface IFavorites {
  getAllFavorites: (
    id_user: string
  ) => Promise<Pick<Favorite, "id" | "id_serie">[] | null>;
  createNewFavoriteInUser: (
    id_serie: number,
    id_user: string
  ) => Promise<Favorite | null>;
  createNewFavoriteInGoogleUser: (
    id_serie: number,
    id_user: string
  ) => Promise<Favorite | null>;
  deleteFavorite: (id: string) => Promise<Favorite | null>;
}

export class FavoriteModel implements IFavorites {
  async getAllFavorites(id_user: string) {
    const favorites = await prisma.favorite.findMany({
      where: {
        OR: [{ id_user }, { id_google_user: id_user }],
      },
      select: {
        id: true,
        id_serie: true,
      },
    });

    return favorites;
  }

  async createNewFavoriteInUser(id_serie: number, id_user: string) {
    const newFavorite = await prisma.favorite.create({
      data: {
        id_serie,
        id_user,
      },
    });

    return newFavorite;
  }

  async createNewFavoriteInGoogleUser(id_serie: number, id_user: string) {
    const newFavorite = await prisma.favorite.create({
      data: {
        id_serie,
        id_google_user: id_user,
      },
    });

    return newFavorite;
  }

  async deleteFavorite(id: string) {
    const deleteFav = await prisma.favorite.delete({
      where: {
        id,
      },
    });

    return deleteFav;
  }
}
