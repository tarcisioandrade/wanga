import React, { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "src/components/Header";
import { Container, Layout } from "src/components/Layout";
import { DownloadHistoric, useDownload } from "src/hooks/useDownload";
import { FlatList } from "react-native-gesture-handler";
import DownloadItem from "./components/DowloadItem";
import Empty from "src/components/Empty";
import DownloadHeader from "src/components/DeleteHeader";
import { vs } from "src/utils/metrics";
import { BackHandler } from "react-native";

const fakeHistoric: DownloadHistoric[] = [
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
  const [downloadHistoric, setDownloadHistoric] = useState<DownloadHistoric[]>(
    []
  );
  const { getDownloadHistoric, updateDownloadHistoric } = useDownload();
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const navigator = useNavigation();
  const deleteMode = deleteList.length > 0;

  const fetchDownloadHistoric = async () => {
    try {
      //TODO: Change in PROD
      const downloads = await getDownloadHistoric();
      // const downloads = fakeHistoric;

      if (downloads) {
        setDownloadHistoric(downloads.reverse());
      }
    } catch (error) {
      console.error("Erro ao buscar histórico de downloads:", error);
      throw error;
    }
  };

  const goToMangaPage = (id_manga: number) => {
    // navigator.navigate("manga", {
    //   id: id_manga,
    // });
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
    if (deleteList.length && downloadHistoric) {
      const newHistoric = downloadHistoric.filter(
        (item) => !deleteList.includes(item.id)
      );
      updateDownloadHistoric(newHistoric);
      setDownloadHistoric(newHistoric);
      cancelDeleteMode();
    }
  };

  const selectAllToDelete = () => {
    const alreadySelected = downloadHistoric
      .filter((item) => !deleteList.includes(item.id))
      .map((item) => item.id);

    setDeleteList((prev) => [...prev, ...alreadySelected]);
  };

  const cancelDeleteMode = () => {
    setDeleteList([]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDownloadHistoric();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (deleteMode) {
          cancelDeleteMode();
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [deleteMode])
  );

  return (
    <Layout>
      {deleteMode ? (
        <DownloadHeader
          cancelAction={cancelDeleteMode}
          deleteAction={onDeleteDownloadHistoy}
          selectAllAction={selectAllToDelete}
        />
      ) : (
        <Header menuShow logoShow searchShow categoryShow />
      )}
      <Container mt={10}>
        {!downloadHistoric.length ? (
          <Empty />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: vs(150),
            }}
            keyExtractor={(item) => item.id}
            data={downloadHistoric}
            renderItem={({ item }) => {
              const checked = deleteList.includes(item.id);

              return (
                <DownloadItem
                  downloadInfo={item}
                  deleteMode={deleteMode}
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
