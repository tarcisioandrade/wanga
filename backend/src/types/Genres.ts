export interface GenreResponse {
  genres: Genre[];
}

export type Genre = {
  id: number;
  name: string;
  titles: number;
  link: string;
};
