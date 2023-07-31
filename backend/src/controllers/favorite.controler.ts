import { Request, Response } from "express";
import { FavoriteModel } from "../models/Favorites.model";
import { UserModel } from "../models/User.model";
import { userDecodeToken } from "../utils/userDecodeToken";
import { Favorite } from "@prisma/client";

const favoriteModel = new FavoriteModel();
const userModel = new UserModel();

export class FavoriteController {
  constructor() {
    this.getAllFavorites = this.getAllFavorites.bind(this);
    this.createNewFavorite = this.createNewFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  async getAllFavorites(req: Request, res: Response) {
    const { id_user } = req.body;

    const favorites = await favoriteModel.getAllFavorites(id_user);

    res.status(200).json({ favorites });
  }

  async createNewFavorite(req: Request, res: Response) {
    const { id_user, id_serie, provider } = req.body;
    let newFavorite: Favorite | null;
    console.log("provider", provider);
    try {
      if (provider === "Wanga") {
        newFavorite = await favoriteModel.createNewFavoriteInUser(
          Number(id_serie),
          id_user
        );
      }

      if (provider === "Google") {
        newFavorite = await favoriteModel.createNewFavoriteInGoogleUser(
          Number(id_serie),
          id_user
        );
      }

      res.sendStatus(201);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteFavorite(req: Request, res: Response) {
    const del_list = req.body.del_list as string[];

    del_list.forEach(async (favorite) => {
      await favoriteModel.deleteFavorite(favorite);
    });

    res.sendStatus(200);
  }
}
