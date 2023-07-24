export interface Pages {
  name: string;
  chapter_number: string;
  release_id: number;
  images: Image[];
  next_chapter: ChapterProps;
  prev_chapter: ChapterProps;
}

export type Image = {
  legacy: string;
  avif: string;
};

export type ChapterProps = {
  number: string | null;
  release_id: number | null;
};
