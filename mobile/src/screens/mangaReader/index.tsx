import React, { useState } from "react";
import { RootStackScreenProps } from "src/@types/navigation";
import { Layout } from "src/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getPages } from "src/api/wangaServices";
import { Alert, StatusBar, Linking } from "react-native";
import Reader from "./components/Reader";
import { useDisclose } from "src/hooks/useDisclose";
import FooterReader from "./components/FooterReader";
import HeaderReader from "./components/HeaderReader";
import { useDownload } from "src/hooks/useDownload";
import Toast from "react-native-toast-message";
import LoadingReader from "./components/LoadingReader";
import * as FileSystem from "expo-file-system";

const { StorageAccessFramework } = FileSystem;

const MangaReader = ({ route }: RootStackScreenProps<"mangaReader">) => {
  const { id_release, manga } = route.params;
  const [chapter, setChapter] = useState(id_release);
  const { state, close, open, toggle } = useDisclose(true);

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.pages, chapter],
    queryFn: () => getPages(chapter),
    cacheTime: Infinity,
  });

  const { handleDownload, saveDownloadInHistoric } = useDownload();

  const images = data?.images.map(({ legacy }) => ({
    url: legacy,
  }));

  const hasNextChapter = !!data?.next_chapter.release_id;
  const hasPrevChapter = !!data?.prev_chapter.release_id;

  const nextChapter = () => {
    if (data && hasNextChapter) {
      setChapter(Number(data.next_chapter.release_id));
    }
  };

  const prevChapter = () => {
    if (data && hasPrevChapter) {
      setChapter(Number(data.prev_chapter.release_id));
    }
  };

  // TODO: Tratar error
  if (error) {
    if (error instanceof Error) {
      Alert.alert("Server Error", error.message);
    }
  }

  const downloadInit = async () => {
    const albumName = `${data?.name}-${data?.chapter_number}`;
    let fileSize = 0;

    if (!images || !manga) return;

    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permission.granted) {
      Toast.show({
        type: "success",
        text1: "Download Iniciado",
        topOffset: 50,
      });
      for (let i = 0; i < images.length; i++) {
        try {
          const size = await handleDownload(
            images[i].url,
            i,
            permission.directoryUri
          );
          if (size) fileSize += size;
        } catch (error) {
          return;
        }
      }
      saveDownloadInHistoric(
        albumName,
        fileSize,
        Number(manga.id_serie),
        manga.image
      );
    } else if (!permission.granted) {
      Alert.alert(
        "Permisão Negada",
        "Por favor, aceite a permissão para iniciar o download.",
        [
          { text: "Cancelar" },
          { text: "Configurações", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }
  };

  if (isLoading) return <LoadingReader />;
  return (
    <Layout>
      <StatusBar hidden />
      <HeaderReader
        show={state}
        startDownload={downloadInit}
        currentChapter={data?.chapter_number}
      />
      <Reader
        mangaName={data?.name}
        id_release={data?.release_id}
        data={images}
        close={close}
        open={open}
        toggle={toggle}
        state={state}
      />
      <FooterReader
        show={state}
        nextChapter={nextChapter}
        prevChapter={prevChapter}
        hasNextChapter={hasNextChapter}
        hasPrevChapter={hasPrevChapter}
      />
    </Layout>
  );
};

export default MangaReader;
