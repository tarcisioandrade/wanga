import { MangaTarget } from "../types/Manga";

export function parseManga(html: string, id: string) {
  let manga = {} as MangaTarget;

  html = html.replace(/(\r\n|\n|\r)/gm, "");

  let series_desc_div = html
    .match(/(<div id="series-desc").*(?=<div id="chapter-list")/gm)![0]
    .trim();

  manga.name = series_desc_div
    .match(/(?<=series-info touchcarousel.*<h1>).*?(?=<\/h1>)/gm)!
    .slice(-1)[0]
    .trim();
  manga.id_serie = id;
  manga.link = "https://mangalivre.net/manga/id/" + id;
  manga.author = series_desc_div
    .match(
      /(?<=id="series-data".*?<span class="series-author">).*?(?=<\/span)/gm
    )!
    .slice(-1)[0]
    .trim()
    .replace(/<i.*?<\/i>/gm, "")
    .replace(/<a.*<\/a>/gm, "")
    .trim()
    .replace(/\s+/g, " ");
  manga.description = series_desc_div
    .match(/(?<=<span class="series-desc">.*?span>).*?(?=<\/span>.*?)/gm)![0]
    .trim()
    .replace(/<br>/gm, "")
    .trim()
    .replace(/<(\/|)(br|a|b|span|div)(\/|)>/gm, "")
    .replace(/&nbsp;/gm, " ");
  manga.chapters_count = html
    .match(
      /(?<=id="chapter-list".*layout\/number-chapters.*?<span>).*?(?=<\/span>)/gm
    )![0]
    .trim();
  manga.image = series_desc_div
    .match(/(?<=div class=\"cover\"> *?<img src=").*().(?:jpg|jpeg|png)/gm)![0]
    .trim();
  manga.score = series_desc_div
    .match(/(?<=<div class="score-number">).*?(?=<\/div>)/gm)![0]
    .trim();
  let categories = series_desc_div.match(
    /(?<=ul class="tags touchcarousel-container".*?Categoria de mangás: ).*?(?=")/gm
  );
  if (categories) {
    manga.categories = categories.map((genre) => {
      return genre;
    });
  } else {
    manga.categories = [];
  }
  return manga;
}
