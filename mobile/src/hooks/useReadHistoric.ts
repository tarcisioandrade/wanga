import AsyncStorage from "@react-native-async-storage/async-storage";

export type ReadHistoric = {
  id: string;
  name: string;
  last_read_time: string;
  id_release: number;
  last_chapter_read: string;
  image: string;
};

export const useReadHistoric = () => {
  const getReadHistoric = async () => {
    const historyRead = await AsyncStorage.getItem("@read_history");

    return historyRead ? (JSON.parse(historyRead) as ReadHistoric[]) : null;
  };

  const setReadHistoric = async (history: ReadHistoric) => {
    const currentHistoric = await getReadHistoric();
    const historyRead = currentHistoric
      ? currentHistoric
      : ([] as ReadHistoric[]);

    if (historyRead) {
      const historyTarget = historyRead.findIndex(
        (item) => item.id === history.id
      );

      if (historyTarget !== -1) {
        historyRead[historyTarget] = {
          ...historyRead[historyTarget],
          id_release: history.id_release,
          last_chapter_read: history.last_chapter_read,
          last_read_time: history.last_read_time,
        };

        updateReadHistoric(historyRead);
        return;
      }

      if (historyRead.length === 30) {
        historyRead.pop();
      }

      historyRead.push(history);
      updateReadHistoric(historyRead);
    }
  };

  const updateReadHistoric = async (newValue: ReadHistoric[]) => {
    await AsyncStorage.setItem("@read_history", JSON.stringify(newValue));
  };

  const updateChapterHistoric = async (name: string, chapter: string) => {
    const currentHistoric = await getReadHistoric();
    const historic = currentHistoric ? currentHistoric : ([] as ReadHistoric[]);

    if (currentHistoric) {
      const targetIndex = currentHistoric.findIndex((his) => his.name === name);

      if (targetIndex !== -1) {
        historic[targetIndex] = {
          ...historic[targetIndex],
          last_chapter_read: chapter,
          last_read_time: new Date().toISOString(),
        };
        updateReadHistoric(historic);
      }
    }
  };

  return {
    getReadHistoric,
    setReadHistoric,
    updateReadHistoric,
    updateChapterHistoric,
  };
};
