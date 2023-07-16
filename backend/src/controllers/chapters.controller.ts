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
        // res.sendStatus(404);
        res.send(return_data);
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
          res.send({
            chapters: false,
            current_page: Number(page),
          });
          return;
        }

        return_data.chapters = result.chapters;

        // checa se as infos já foram adicionadas para evitar ficar reescrevendo os valores.
        if (!return_data.name) {
          return_data.id_serie = result.id_serie;
          return_data.url_name = result.url_name;
          return_data.name = result.name;
        }

        res.send({
          chapters: return_data.chapters,
          current_page: Number(page),
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          handleError(res, 404, error.message);
        }
      });
  }

  async getDoubleChapterPerPage(req: Request, res: Response) {
    const id = req.params.id;
    const page = Number(req.params.page);

    let pageInMangalivre = page;
    const pageDouble = Number(page) + 1;

    if (pageInMangalivre >= 2) {
      pageInMangalivre = pageInMangalivre + 1;
    }

    if (!id) {
      handleError(res, 400, "Please send id.");
    }

    let return_data = {
      id_serie: 0,
      name: "",
      url_name: "",
      chapters: [],
    } as Chapter;

    for (let i = pageInMangalivre; i <= pageDouble; i++) {
      try {
        const result = await chapterModel.getChapters(id, i);

        if (!result) break;

        return_data.chapters = return_data.chapters.concat(result.chapters);
      } catch (error) {
        if (error instanceof Error) {
          handleError(res, 400, error.message);
          console.error("chapters error", error.message);
          break;
        }
      }
    }

    if (!return_data.chapters.length) {
      res.send({
        chapters: false,
        current_page: Number(page),
      });
    } else {
      res.send({
        chapters: return_data.chapters,
        current_page: Number(page),
      });
    }
  }
}
