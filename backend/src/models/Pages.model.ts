import got from "got";
import { Image, Pages } from "../types/Pages";

interface IPages {
  getInfoPages: (release_id: string) => Promise<Omit<Pages, "images">>;
  getPagesImages: (release_id: string) => Promise<Image[]>;
}

export class PagesModel implements IPages {
  async getInfoPages(release_id: string) {
    const return_data: Omit<Pages, "images"> = {
      name: "",
      next_chapter: { number: null, release_id: null },
      prev_chapter: { number: null, release_id: null },
      chapter_number: "",
      release_id: 0,
    };

    const response = await got(
      `https://api.scrape.do?token=4a9a40f7e68d45c28b012982fdea855f040aeef4ec4&url=https://mangalivre.net/ler/null/online/${release_id}/capitulo-0/`
    );

    // Capitulo Atual
    return_data.chapter_number = response.body
      .match(/(?<=var number = ").*(?=";)/gm)![0]
      .trim();

    // Todos os capitulos do mangá
    // TODO: Tirar o Reverse para da sort e começar do capitulo 1
    let chapters = JSON.parse(
      response.body.match(/(?<=chapters = ).*?(?=;)/gm)![0].trim()
    ).reverse();

    return_data.name = response.body.match(
      /(?<=span class="title">).*(?=<\/span>)/gm
    )![0];

    for (const chapter of chapters) {
      let chapter_index = chapters.indexOf(chapter);
      if (chapter.number == return_data.chapter_number) {
        return_data.release_id = chapters[chapter_index].id_release;

        if (chapter_index < chapters.length - 1) {
          let next_chapter = chapters[chapter_index + 1];
          return_data.next_chapter.number = next_chapter.number;
          return_data.next_chapter.release_id = next_chapter.id_release;
        }

        if (chapter_index > 0) {
          let prev_chapter = chapters[chapter_index - 1];
          return_data.prev_chapter.number = prev_chapter.number;
          return_data.prev_chapter.release_id = prev_chapter.id_release;
        }
      }
    }

    return return_data;
  }

  async getPagesImages(release_id: string) {
    let images: Image[] = [];
    const response = await got(
      `https://api.scrape.do?token=4a9a40f7e68d45c28b012982fdea855f040aeef4ec4&url=https://mangalivre.net/leitor/pages/${release_id}.json`
    );
    images = JSON.parse(response.body).images;

    return images;
  }
}
