import got from "got";
import { Image, Pages } from "../types/Pages";

interface IPages {
  getPNPages: (release_id: string) => Promise<Omit<Pages, "images">>;
  getPagesImages: (release_id: string) => Promise<Image[]>;
}

export class PagesModel implements IPages {
  async getPNPages(release_id: string) {
    const return_data: Omit<Pages, "images"> = {
      next_chapter: { number: null, release_id: null },
      prev_chapter: { number: null, release_id: null },
      chapter_number: "",
    };

    const response = await got(
      `https://mangalivre.net/ler/null/online/${release_id}/capitulo-0/`
    );

    // Capitulo Atual
    return_data.chapter_number = response.body
      .match(/(?<=var number = ").*(?=";)/gm)![0]
      .trim();

    // Todos os capitulos do mangá
    let chapters = JSON.parse(
      response.body.match(/(?<=chapters = ).*?(?=;)/gm)![0].trim()
    ).reverse();

    //

    for (const chapter of chapters) {
      let chapter_index = chapters.indexOf(chapter);
      if (chapter.number == return_data.chapter_number) {
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
      `https://mangalivre.net/leitor/pages/${release_id}.json`
    );
    images = JSON.parse(response.body).images;

    return images;
  }
}
