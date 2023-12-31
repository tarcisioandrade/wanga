import { Request, Response } from "express";
import { PagesModel } from "../models/Pages.model";
import { handleError } from "../utils/handleError";
import { Pages } from "../types/Pages";

const pagesModel = new PagesModel();

export class PagesController {
  constructor() {
    this.getPages = this.getPages.bind(this);
  }

  async getPages(req: Request, res: Response) {
    const id = req.params.id;
    let return_data = {} as Pages;
    try {
      const { chapter_number, next_chapter, prev_chapter, name, release_id } =
        await pagesModel.getInfoPages(id);
      const images = await pagesModel.getPagesImages(id);

      return_data = {
        name,
        chapter_number,
        release_id,
        prev_chapter,
        next_chapter,
        images,
      };

      res.send(return_data);
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, 400, error.message);
      } else {
        console.error(error);
      }
    }
  }
}
