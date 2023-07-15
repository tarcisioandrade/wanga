import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChaptersFavorite = {
  [key: string]: {
    reads: number[];
  };
};

export const getFavoriteChapters = async () => {
  const favorites = await AsyncStorage.getItem("chapterFavorites");

  return favorites ? (JSON.parse(favorites) as ChaptersFavorite[]) : null;
};

export const setFavoriteChapter = async (name: string, id_release: number) => {
  const currentFavorites = await getFavoriteChapters();

  const favorites = currentFavorites ? currentFavorites : [];

  const alreadySaveInFavorites = favorites.some((fav) => fav[name]);

  if (alreadySaveInFavorites) {
    favorites.forEach((fav) => {
      if (fav[name]) {
        const itemToRemove = fav[name].reads.indexOf(id_release);

        if (itemToRemove !== -1) {
          fav[name].reads.splice(itemToRemove, 1);
        }

        fav[name].reads.push(id_release);
      }
    });
  } else {
    favorites.push({
      [name]: {
        reads: [id_release],
      },
    });
  }

  AsyncStorage.setItem("chapterFavorites", JSON.stringify(favorites));
};
