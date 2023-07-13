export interface Pages {
  name: string;
  chapter_number: string;
  images: Image[];
  next_chapter: NextChapter;
  prev_chapter: PrevChapter;
}

export type Image = {
  legacy: string;
  avif: string;
};

export type NextChapter = {
  number: string | null;
  release_id: number | null;
};

export type PrevChapter = {
  number: string | null;
  release_id: number | null;
};
