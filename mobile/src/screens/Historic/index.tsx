import React, { useState, useCallback, useEffect } from "react";
import { Container, Layout } from "src/components/Layout";
import Header from "src/components/Header";
import { ReadHistoric, useReadHistoric } from "src/hooks/useReadHistoric";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, BackHandler } from "react-native";
import Empty from "src/components/Empty";
import HistoricItem from "./components/HistoricItem";
import { vs } from "src/utils/metrics";
import DownloadHeader from "src/components/DeleteHeader";

const Historic = () => {
  const [historic, setHistoric] = useState<ReadHistoric[]>([]);
  const { getReadHistoric, updateReadHistoric } = useReadHistoric();
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const navigator = useNavigation();
  const deleteMode = deleteList.length > 0;

  const fetchReadHistoric = async () => {
    try {
      const currentHistoric = await getReadHistoric();
      if (currentHistoric) {
        const historisSortedToDate = currentHistoric.sort(
          (a, b) =>
            new Date(b.last_read_time).getTime() -
            new Date(a.last_read_time).getTime()
        );

        setHistoric(historisSortedToDate);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      throw error;
    }
  };

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
    if (deleteList.length && historic) {
      const newHistoric = historic.filter(
        (item) => !deleteList.includes(item.id)
      );
      updateReadHistoric(newHistoric);
      setHistoric(newHistoric);
      cancelDeleteMode();
    }
  };

  const selectAllToDelete = () => {
    const alreadySelected = historic
      .filter((item) => !deleteList.includes(item.id))
      .map((item) => item.id);

    setDeleteList((prev) => [...prev, ...alreadySelected]);
  };

  const cancelDeleteMode = () => {
    setDeleteList([]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchReadHistoric();
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
        {!historic?.length ? (
          <Empty />
        ) : (
          <FlatList
            data={historic}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: vs(150),
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const checked = deleteList.includes(item.id);

              return (
                <HistoricItem
                  historic={item}
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

export default Historic;
