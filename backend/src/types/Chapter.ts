export type Chapter = {
  id_serie: number;
  url_name: string;
  name: string;
  chapters: {
    chapter_name: string | null;
    number: string;
    date: string;
    id_release: number;
  }[];
};

export interface ChapterBody {
  chapters: ChapterList[];
}

export interface ChapterList {
  id_serie: number;
  id_chapter: number;
  name: string;
  chapter_name: string | null;
  number: string;
  date: string;
  date_created: Date;
  releases: Releases;
  seasonAnimeFinished: null;
  officialLink: null;
  predictionDate: null;
  predictionDateToCalc: null;
  serieFirstChapter: string;
  officialSerieLink: null;
}

export interface Releases {
  [key: string]: ReleaseInfo;
}

export interface ReleaseInfo {
  id_release: number;
  scanlators: Scanlator[];
  views: number;
  link: string;
}

export interface Scanlator {
  id_scanlator: number;
  name: string;
  link: string;
}
