import { MangaTarget } from "../types/Manga";

export function parseResults(html: string) {
  const mangas: MangaTarget[] = [];
  html = html.replace(/(\r\n|\n|\r)/gm, "");

  // li tags
  const lis = html.match(
    new RegExp('<li> *<a href="/manga/.*?</div> *</a> *</li>', "gm")
  );

  if (!lis) {
    throw new Error("Mangas Li not found");
  }

  for (let li of lis) {
    const manga = {} as MangaTarget;

    manga.name = li.match(/(?<=series-title......).*?(?=<\/h1>)/gm)![0].trim();
    manga.author = li
      .match(/(?<=<span class="series-author">).*?(?=<\/span>)/gm)![0]
      .trim()
      .replace(/\<i.*<\/i>/gm, "")
      .replace(/(\ \ )*/gm, "")
      .replace(/&/, " & ");
    manga.description = li
      .match(/(?<=<span class="series-desc">).*?(?=<\/span>)/gm)![0]
      .trim()
      .replace(/<(\/|)(br|a|b|span)(\/|)>/gm, "")
      .replace(/&nbsp;/gm, " ");
    manga.link = li.match(/(?<=\<a href=\").*?(?=" )/gm)![0].trim();
    manga.id_serie = manga.link.replace(/.*\//gm, "");
    manga.chapters_count = li
      .match(/(?<=number of chapters">).*?(?=<\/span>)/gm)![0]
      .trim();
    manga.image = li
      .match(/(?<=background-image: url\(\').*?(?=\')/gm)![0]
      .trim();
    manga.score = li.match(/(?<=class="nota">)....(?=<\/span>)/gm)![0].trim();

    let categories = li.match(
      /(?<="touch-carousel-item.*<span class="nota">).*?(?=<\/span>)/gm
    );
    if (categories) {
      manga.categories = categories.map((genre) => {
        return genre;
      });
    } else {
      manga.categories = [];
    }
    mangas.push(manga);
  }

  return mangas;
}
