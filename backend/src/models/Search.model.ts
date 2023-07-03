import got from "got";
import { Categories, Manga } from "../types/Manga";
import { ResultBody } from "../types/ResultBody";

interface ISearch {
  search: (searchValue: string) => Promise<ResultBody<Manga>>;
}

export class SearchModel implements ISearch {
  async search(searchValue: string) {
    let result: ResultBody<Manga> = { data: [] };
    const form = "search=" + searchValue;

    const response = await got.post(
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
      throw new Error("No manga with this name has been found");
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
  }
}
