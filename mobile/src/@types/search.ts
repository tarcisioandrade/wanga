// Generated by https://quicktype.io

export interface Search {
  series: Serie[];
}

export interface Serie {
  id_serie: number;
  name: string;
  label: string;
  score: string;
  value: string;
  author: string;
  artist: string;
  categories: Category[];
  cover: string;
  cover_thumb: string;
  cover_avif: string;
  cover_thumb_avif: string;
  link: string;
  is_complete: boolean;
}

export interface Category {
  id_category: number;
  id_sub_domain: null;
  domain: Domain;
  name: string;
  _joinData: JoinData;
}

export interface JoinData {
  id_serie_category: number;
  id_serie: number;
  id_category: number;
}

export enum Domain {
  Main = "MAIN",
}
