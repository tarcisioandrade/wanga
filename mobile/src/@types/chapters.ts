export interface ChapterBody {
  chapters: Chapter[];
  current_page: number;
}

export interface Chapter {
  chapter_name: null | string;
  number: string;
  date: string;
  id_release: number;
}
