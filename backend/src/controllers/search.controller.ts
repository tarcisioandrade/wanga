import { Request, Response } from "express";
import { SearchModel } from "../models/Search.model";
import { handleError } from "../utils/handleError";

const searchModel = new SearchModel();

export class SearchController {
  constructor() {
    this.getSearchManga = this.getSearchManga.bind(this);
  }

  async getSearchManga(req: Request, res: Response) {
    const searchValue = req.query.q;

    if (!searchValue) {
      res.status(400).json({ message: "Please send value to search." });
    }

    searchModel
      .search(String(searchValue))
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        if (error instanceof Error) {
          handleError(res, 404, error.message);
        }
      });
  }
}
