import React, { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { RootStackScreenProps } from "src/@types/navigation";
import Header from "src/components/Header";
import { Container, Layout, Stack } from "src/components/Layout";
import MangaCard from "./components/MangaCard";
import Tabs, { TabType } from "src/components/Tabs";
import { useMangaQueries } from "src/hooks/useMangaQueries";
import { vs } from "src/utils/metrics";
import MostReadPeriodScreenSkeleton from "./components/MostReadPeriodScreenSkeleton";

const periodTabs: TabType[] = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
  { value: "year", label: "Ano" },
];

const typeMangaTabs: TabType[] = [
  { value: "", label: "Todos" },
  { value: "manga", label: "Mangás" },
  { value: "manhua", label: "Manhuas" },
  { value: "webtoon", label: "Webtoons" },
  { value: "novel", label: "Novels" },
];

const MostReadPeriod = ({ route }: RootStackScreenProps<"mostReadPeriod">) => {
  const { type: typeDefault } = route.params;
  const [period, setPeriod] = useState("week");
  const [type, setType] = useState(typeDefault);

  const {
    mostReadPeriodResult: { data, error, isLoading },
  } = useMangaQueries(type, period);

  const handlePeriodTabChange = useCallback((value: string) => {
    setPeriod(value);
  }, []);

  const handleTypeTabChange = useCallback((value: string) => {
    setType(value);
  }, []);

  const dataFitred = data?.most_read.map(
    ({ chapter_number, series_image, id_serie, series_name }) => ({
      chapter_number,
      series_image,
      id_serie,
      series_name,
    })
  );

  // TODO: Tratar error
  if (error) {
    console.error(error);
    return null;
  }

  return (
    <Layout>
      <Header backShow searchShow />
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
          <MostReadPeriodScreenSkeleton />
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
