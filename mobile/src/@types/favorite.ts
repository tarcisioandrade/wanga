export interface FavoriteBody {
  favorites: Favorite[];
}

export type Favorite = {
  id: string;
  id_serie: number;
};
