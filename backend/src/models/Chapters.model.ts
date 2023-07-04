import got from "got";
import { Chapter, ChapterBody } from "../types/Chapter";

interface IChapter {
  getChapters: (id: string, page: number | string) => Promise<Chapter | null>;
}

export class ChaptersModel implements IChapter {
  async getChapters(id: string, page: string | number) {
    let return_data = {} as Chapter;
    return_data.chapters = [];

    let response = await got(
      `https://mangalivre.net/series/chapters_list.json?page=${page}&id_serie=${id}`,
      {
        headers: {
          "x-requested-with": "XMLHttpRequest",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const chaptersBody: ChapterBody = JSON.parse(response.body);

    if (chaptersBody.chapters) {
      return_data.id_serie = chaptersBody.chapters[0].id_serie;
      return_data.url_name =
        chaptersBody.chapters[0].releases[
          Object.keys(chaptersBody.chapters[0].releases)[0]
        ].link.match(/(?<=ler\/).*?(?=\/)/)![0];
      return_data.name = chaptersBody.chapters[0].name;
      for (let chapter of chaptersBody.chapters) {
        return_data.chapters.push({
          chapter_name: chapter.chapter_name || null,
          number: chapter.number,
          date: chapter.date,
          id_release:
            chapter.releases[Object.keys(chapter.releases)[0]].id_release,
        });
      }
    } else {
      return null;
    }

    return return_data;
  }
}
