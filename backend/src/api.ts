import got from "got";
import { parseManga } from "./utils/parseManga";
import { parseResults } from "./utils/parseResults";
import { Categories, Manga, MangaTarget } from "./types/Manga";
import { Chapter, ChapterBody } from "./types/Chapter";
import { Pages } from "./types/Pages";
import { Genre } from "./types/Genres";
import { ResultBody } from "./types/ResultBody";

export function search(name: string) {
  let result: ResultBody<Manga> = { data: [] };

  const form = "search=" + name;

  return (async () => {
    try {
      let response = await got.post(
        "https://mangalivre.net/lib/search/series.json",
        {
          body: form,
          headers: {
            "x-requested-with": "XMLHttpRequest",
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      // nenhum resultado
      if (!JSON.parse(response.body).series) {
        return result;
      }

      for (let serie of JSON.parse(response.body).series) {
        result.data.push({
          id_serie: serie.id_serie,
          name: serie.name,
          label: serie.label,
          score: serie.score,
          value: serie.value,
          author: serie.author,
          artist: serie.artist,
          image: serie.cover,
          categories: serie.categories.map((categorie: Categories) => {
            return {
              name: categorie.name,
              id_category: categorie.id_category,
            };
          }),
          complete: serie.is_complete,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw error;
      }
      console.log(error);
    }
  })();
}

export function getChapters(id: string, page: number | string) {
  let return_data = {} as Chapter;
  return_data.chapters = [];

  return (async () => {
    try {
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
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }

    return return_data;
  })();
}

export async function getPages(release_id: string) {
  let return_data = {} as Pages;
  return_data.next_chapter = { number: null, release_id: null };
  return_data.prev_chapter = { number: null, release_id: null };

  await (async () => {
    try {
      let response = await got(
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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }
  })();

  return await (async () => {
    try {
      let response = await got(
        `https://mangalivre.net/leitor/pages/${release_id}.json`
      );
      return_data.images = JSON.parse(response.body).images;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }
    return return_data;
  })();
}

export function getGenres() {
  var return_data: ResultBody<Genre> = { data: [] };

  return (async () => {
    try {
      let response = await got(
        "https://mangalivre.net/categories/categories_list.json"
      );
      const result = JSON.parse(response.body) as any;

      for (let genre of result.categories_list) {
        return_data.data.push({
          id: genre.id_category,
          name: genre.name,
          titles: genre.titles,
          link: genre.link,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }

    return return_data;
  })();
}

export function getRecents(page: string) {
  const return_data: ResultBody<MangaTarget> = { data: [] };

  return (async () => {
    try {
      let response = await got(
        "https://mangalivre.net/series/index/atualizacoes?page=" + page
      );
      return_data.data = parseResults(response.body);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }
    return return_data;
  })();
}

export function getPopular(page: string) {
  const return_data: ResultBody<MangaTarget> = { data: [] };

  return (async () => {
    try {
      let response = await got(
        "https://mangalivre.net/series/index/numero-de-leituras/todos/desde-o-comeco?page=" +
          page
      );
      return_data.data = parseResults(response.body);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }
    return return_data;
  })();
}

export function getTop(page: string) {
  const return_data: ResultBody<MangaTarget> = { data: [] };

  return (async () => {
    try {
      let response = await got(
        "https://mangalivre.net/series/index/nota?page=" + page
      );

      console.log("response", response);
      return_data.data = parseResults(response.body);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error(error);
    }
    return return_data;
  })();
}

export function getMangaById(id: string) {
  var return_data = { manga: {} };

  return (async () => {
    try {
      let response = await got(
        "http://api.scrape.do?token=4a9a40f7e68d45c28b012982fdea855f040aeef4ec4&url=https://mangalivre.net/manga/null/" +
          id
      );
      return_data.manga = parseManga(response.body, id);
    } catch (error) {
      console.error(error);
      throw error;
    }
    return return_data;
  })();
}
