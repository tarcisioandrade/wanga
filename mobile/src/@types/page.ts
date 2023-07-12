export interface Page {
  chapter_number: string;
  next_chapter: ChapterPage;
  images: ImagePage[];
  prev_chapter: ChapterPage;
}

export interface ImagePage {
  legacy: string;
  avif: string;
}

export interface ChapterPage {
  number: string | null;
  release_id: number | null;
}
