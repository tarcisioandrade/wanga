export interface MangaResponse {
  data: Manga[];
}

export type Manga = {
  id_serie: number;
  name: string;
  label: string;
  score: string;
  value: string;
  author: string;
  artist: string;
  image: string;
  categories: Categories;
  complete: boolean;
};

export type Categories = {
  name: string;
  id_category: number;
};

export type MangaTarget = Pick<Manga, "name" | "image" | "author" | "score"> & {
  id_serie: string;
  link: string;
  description: string;
  chapters_count: string;
  categories: string[];
};
