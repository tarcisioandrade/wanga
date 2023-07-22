import { CategoryElement } from "./category";
import { Serie } from "./search";

export interface CategorySeriesBody {
  series: Serie[];
  nextPage: number;
}

// Foi usado o type Serie, mas deixei aqui para lembrar;
export interface CategorySerie {
  id_serie: number;
  name: string;
  chapters: number;
  description: string;
  cover: string;
  cover_thumb: string;
  cover_avif: string;
  cover_thumb_avif: string;
  author: string;
  artist: string;
  score: string;
  categories: Pick<CategoryElement, "id_category" | "name" | "link">[];
  link: string;
  is_complete: boolean;
}
