// Generated by https://quicktype.io

export interface Featured {
  featured: FeaturedElement[];
}

export interface FeaturedElement {
  id_serie: number;
  id_chapter: number;
  date: string;
  release_date: string;
  series_name: string;
  hex_color: string;
  featured_image: string;
  domain: string;
  link: string;
  chapter: FeaturedChapter;
}

export interface FeaturedChapter {
  id_release: number;
  number: string;
  scanlator_name: string;
  scanlators: string;
  _scans_array: ScansArray[];
  date: string;
  day: string;
}

export interface ScansArray {
  id_scanlator: number;
  name: string;
}
