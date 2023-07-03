import { Request, Response } from "express";
import { ChaptersModel } from "../models/Chapters.model";
import { Chapter } from "../types/Chapter";
import { handleError } from "../utils/handleError";

const chapterModel = new ChaptersModel();

export class ChaptersController {
  constructor() {
    this.getAllChapters = this.getAllChapters.bind(this);
    this.getChapterPerPage = this.getChapterPerPage.bind(this);
  }
  
  async getAllChapters(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      handleError(res, 400, "Please send id.");
    }

    let return_data = {} as Chapter;
    return_data.chapters = [];

    for (let i = 1; ; i++) {
      const result = await chapterModel.getChapters(id, i);

      if (!result) {
        res.sendStatus(404);
        return;
      }

      // checa se as infos ja foram adicionadas para evitar ficar reescrevendo os valores.
      if (!return_data.name) {
        return_data.id_serie = result.id_serie;
        return_data.url_name = result.url_name;
        return_data.name = result.name;
      }

      if (result.chapters.length > 0) {
        return_data.chapters = return_data.chapters.concat(result.chapters);
        continue;
      }
      break;
    }
    res.send(return_data);
  }

  async getChapterPerPage(req: Request, res: Response) {
    const id = req.params.id;
    const page = req.params.page;

    if (!id) {
      handleError(res, 400, "Please send id.");
    }
    let return_data = {} as Chapter;

    chapterModel
      .getChapters(id, page)
      .then((result) => {
        if (!result) {
          res.sendStatus(404);
          return;
        }

        return_data.chapters = result.chapters;

        // checa se as infos já foram adicionadas para evitar ficar reescrevendo os valores.
        if (!return_data.name) {
          return_data.id_serie = result.id_serie;
          return_data.url_name = result.url_name;
          return_data.name = result.name;
        }

        res.send(return_data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          handleError(res, 404, error.message);
        }
      });
  }
}
