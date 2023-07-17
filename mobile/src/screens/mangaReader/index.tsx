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
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import LoadingReader from "./components/LoadingReader";

const MangaReader = ({ route }: RootStackScreenProps<"mangaReader">) => {
  const { id_release, id_manga } = route.params;
  const [chapter, setChapter] = useState(id_release);
  const { state, close, open } = useDisclose(true);

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.pages, chapter],
    queryFn: () => getPages(chapter),
  });

  const { handleDownload, saveDownloadInHistory } = useDownload();

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
    if (!images) return;

    const imageToSave = images[3]?.url || images[2]?.url;

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      for (let i = 0; i < images.length; i++) {
        try {
          const size = await handleDownload(images[i].url, i, albumName);
          if (size) fileSize += size;
        } catch (error) {
          return;
        }
      }
      saveDownloadInHistory(albumName, fileSize, id_manga!, imageToSave);
      Toast.show({
        type: "success",
        text1: "Download Efetuado!",
        position: "bottom",
        bottomOffset: 90,
      });
    } else if (status === "denied") {
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

  // TODO: Criar o modal para falar ao usuario da um longPress para aparecer o header/footer;

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
        mangaName={data?.name!}
        id_release={id_release}
        data={images}
        close={close}
        open={open}
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
