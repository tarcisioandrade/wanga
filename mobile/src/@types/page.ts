export interface Page {
  name: string;
  chapter_number: string;
  release_id: number;
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
