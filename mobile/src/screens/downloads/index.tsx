import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "src/components/Header";
import { Container, Layout } from "src/components/Layout";
import { DownloadHistory, useDownload } from "src/hooks/useDownload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import DownloadItem from "./components/DowloadItem";
import { Text } from "src/components/Text";

const Downloads = () => {
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const { getDownloadHistory } = useDownload();

  const navigator = useNavigation();

  const fetchDownloadHistory = async () => {
    try {
      const downloads = await getDownloadHistory();
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

  console.log(JSON.stringify(downloadHistory[0], null, 2));
  return (
    <Layout>
      <Header menuShow logoShow searchShow />
      <Container mt={10}>
        {!downloadHistory.length ? (
          <Text>Não há nada aqui.</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            keyExtractor={(item) => item.id_manga.toString()}
            data={downloadHistory}
            renderItem={({ item }) => (
              <DownloadItem downloadInfo={item} navigate={goToMangaPage} />
            )}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Downloads;
