import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChaptersRead = {
  [key: string]: {
    reads: number[];
  };
};

export const getReadChapters = async () => {
  const reads = await AsyncStorage.getItem("chapterReads");

  return reads ? (JSON.parse(reads) as ChaptersRead[]) : null;
};

export const setReadChapter = async (name: string, id_release: number) => {
  const currentReads = await getReadChapters();

  const reads = currentReads ? currentReads : [];

  const alreadySaveInReads = reads.some((fav) => fav[name]);

  if (alreadySaveInReads) {
    reads.forEach((fav) => {
      if (fav[name]) {
        const itemToRemove = fav[name].reads.indexOf(id_release);

        if (itemToRemove !== -1) {
          fav[name].reads.splice(itemToRemove, 1);
        }

        fav[name].reads.push(id_release);
      }
    });
  } else {
    reads.push({
      [name]: {
        reads: [id_release],
      },
    });
  }

  AsyncStorage.setItem("chapterReads", JSON.stringify(reads));
};
