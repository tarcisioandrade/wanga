import React from "react";
import { FlatList } from "react-native";
import { RootStackScreenProps } from "src/@types/navigation";
import Header from "src/components/Header";
import { Container, Layout, Stack } from "src/components/Layout";
import MangaCard from "./components/MangaCard";
import Tabs from "src/components/Tabs";
import { useMangaQueries } from "src/hooks/useMangaQueries";
import { vs } from "src/utils/metrics";
import CardsScreenSkeleton from "../../components/CardsScreenSkeleton";
import { useTabs } from "src/hooks/useTabs";
import RefreshInError from "src/components/RefreshInError";

const MostReadPeriod = ({ route }: RootStackScreenProps<"mostReadPeriod">) => {
  const { type: typeDefault } = route.params;
  const {
    type,
    period,
    handlePeriodTabChange,
    handleTypeTabChange,
    typeMangaTabs,
    periodTabs,
  } = useTabs(typeDefault);

  const {
    mostReadPeriodResult: { data, error, isLoading, isError, refetch },
  } = useMangaQueries(type, period);

  const dataFitred = data?.most_read.map(
    ({ chapter_number, series_image, id_serie, series_name }) => ({
      chapter_number,
      series_image,
      id_serie,
      series_name,
    })
  );

  // TODO: Colocar crashalytics
  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <Header backShow title="Mais Lidos" searchShow />
      <Container>
        <Stack pb={23}>
          <Tabs
            tabs={periodTabs}
            activeTab={period}
            onTabChange={handlePeriodTabChange}
          />

          <Tabs
            tabs={typeMangaTabs}
            activeTab={type}
            onTabChange={handleTypeTabChange}
          />
        </Stack>

        {isLoading ? (
          <CardsScreenSkeleton />
        ) : isError ? (
          <RefreshInError refresh={refetch} />
        ) : (
          <FlatList
            data={dataFitred}
            numColumns={3}
            keyExtractor={(item) => item.id_serie.toString()}
            columnWrapperStyle={{
              gap: 9,
            }}
            contentContainerStyle={{
              gap: 9,
              paddingBottom: vs(250),
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MangaCard data={item} width={110} height={157} />
            )}
          />
        )}
      </Container>
    </Layout>
  );
};

export default MostReadPeriod;
