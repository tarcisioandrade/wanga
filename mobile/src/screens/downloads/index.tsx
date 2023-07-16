import React, { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "src/components/Header";
import { Container, Layout } from "src/components/Layout";
import { DownloadHistory, useDownload } from "src/hooks/useDownload";
import { FlatList } from "react-native-gesture-handler";
import DownloadItem from "./components/DowloadItem";
import Empty from "src/components/Empty";
import DownloadHeader from "./components/DownloadHeader";
import { vs } from "src/utils/metrics";

const fakeHistory: DownloadHistory[] = [
  {
    id: "assnajshas",
    downloadDate: new Date().toISOString(),
    fileName: `teste - ${Math.random()}`,
    id_manga: 45 + Math.random(),
    image: "http://github.com/tarcisioandrade.png",
    size: "45mb",
  },
  {
    id: "assnas",
    downloadDate: new Date().toISOString(),
    fileName: `teste - ${Math.random()}`,
    id_manga: 45 + Math.random(),
    image: "http://github.com/tarcisioandrade.png",
    size: "45mb",
  },
  {
    id: "oie",
    downloadDate: new Date().toISOString(),
    fileName: `teste - ${Math.random()}`,
    id_manga: 45 + Math.random(),
    image: "http://github.com/tarcisioandrade.png",
    size: "45mb",
  },
  {
    id: "as34sdff",
    downloadDate: new Date().toISOString(),
    fileName: `teste - ${Math.random()}`,
    id_manga: 45 + Math.random(),
    image: "http://github.com/tarcisioandrade.png",
    size: "45mb",
  },
  {
    id: "assd54ffas",
    downloadDate: new Date().toISOString(),
    fileName: `teste - ${Math.random()}`,
    id_manga: 45 + Math.random(),
    image: "http://github.com/tarcisioandrade.png",
    size: "45mb",
  },
];

const Downloads = () => {
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const { getDownloadHistory, updateDownloadHistory } = useDownload();
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const navigator = useNavigation();
  const deleteMode = deleteList.length > 0;

  const fetchDownloadHistory = async () => {
    try {
      //TODO: Change in PROD
      // const downloads = await getDownloadHistory();
      const downloads = fakeHistory;

      if (downloads) {
        setDownloadHistory(downloads);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico de downloads:", error);
      throw error;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDownloadHistory();
    }, [])
  );

  const goToMangaPage = (id_manga: number) => {
    navigator.navigate("manga", {
      id: id_manga,
    });
  };

  const handleDeleteItems = (id: string) => {
    const hasAddedInList = deleteList.some((del) => del === id);
    if (hasAddedInList) {
      const newList = deleteList.filter((del) => del != id);
      setDeleteList(newList);
    } else {
      setDeleteList((prev) => [...prev, id]);
    }
  };

  const onDeleteDownloadHistoy = async () => {
    if (deleteList.length && downloadHistory) {
      const newHistory = downloadHistory.filter(
        (item) => !deleteList.includes(item.id)
      );
      updateDownloadHistory(newHistory);
      setDownloadHistory(newHistory);
      setDeleteList([]);
    }
  };

  const selectAllToDelete = () => {
    const alreadySelected = downloadHistory
      .filter((item) => !deleteList.includes(item.id))
      .map((item) => item.id);

    setDeleteList((prev) => [...prev, ...alreadySelected]);
  };

  return (
    <Layout>
      {deleteMode ? (
        <DownloadHeader
          cancelAction={() => setDeleteList([])}
          deleteAction={onDeleteDownloadHistoy}
          selectAllAction={selectAllToDelete}
        />
      ) : (
        <Header menuShow logoShow searchShow />
      )}
      <Container mt={10}>
        {!downloadHistory.length ? (
          <Empty />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: vs(150),
            }}
            keyExtractor={(item) => item.id}
            data={downloadHistory}
            renderItem={({ item }) => {
              const checked = deleteList.includes(item.id);

              return (
                <DownloadItem
                  deleteMode={deleteMode}
                  downloadInfo={item}
                  navigate={goToMangaPage}
                  handleDeleteItems={handleDeleteItems}
                  checked={checked}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.75 : 1,
                  })}
                />
              );
            }}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Downloads;
