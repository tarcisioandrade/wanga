import React, { useCallback, useEffect, useState } from "react";
import { Container, Layout } from "src/components/Layout";
import Header from "src/components/Header";
import { Favorite } from "src/@types/favorite";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { delFavorite, getFavorites } from "src/api/wangaServices";
import { FlatList } from "react-native-gesture-handler";
import FavoriteItem from "./components/FavoriteItem";
import { vs } from "src/utils/metrics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler, ToastAndroid, Alert } from "react-native";
import DownloadHeader from "src/components/DeleteHeader";
import Empty from "src/components/Empty";
import { useUser } from "src/contexts/UserContext";
import RefreshInError from "src/components/RefreshInError";
import SearchSkeleton from "../search/components/SearchSkeleton";
import { reportCrash } from "src/utils/crashReporting";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const { user } = useUser();

  const { data, isError, error, refetch, isLoading } = useQuery({
    queryKey: [queryKeys.favorites],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (del_list: string[]) => delFavorite(del_list),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (data) setFavorites(data.favorites);
  }, [data]);

  const navigator = useNavigation();
  const deleteMode = deleteList.length > 0;

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
    if (deleteList.length && data?.favorites) {
      const newFavorites = data.favorites.filter(
        (item) => !deleteList.includes(item.id)
      );

      try {
        await mutateAsync(deleteList);
        setFavorites(newFavorites);
      } catch (error) {
        console.error(error);
        ToastAndroid.show(
          "Não foi possivel realizar esta ação",
          ToastAndroid.TOP
        );
      } finally {
        cancelDeleteMode();
      }
    }
  };

  const cancelDeleteMode = () => {
    setDeleteList([]);
  };

  const selectAllToDelete = () => {
    const alreadySelected = favorites
      .filter((item) => !deleteList.includes(item.id))
      .map((item) => item.id);

    setDeleteList((prev) => [...prev, ...alreadySelected]);
  };

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

  if (error) {
    reportCrash(error, "Favorites");
  }

  //TODO: Passar essa logica do multiple delete para um hook.
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
        {isLoading ? (
          <SearchSkeleton />
        ) : isError ? (
          <RefreshInError refresh={refetch} />
        ) : !favorites?.length ? (
          <Empty />
        ) : (
          <FlatList
            data={favorites}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: vs(150),
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const checked = deleteList.includes(item.id);

              return (
                <FavoriteItem
                  favorite={item}
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

export default Favorites;
