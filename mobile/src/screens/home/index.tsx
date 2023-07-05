import React, { useState, useCallback } from "react";

import { Container, Layout, ScrollContainer } from "src/components/Layout";
import Tabs, { TabType } from "src/components/Tabs";
import { useQueries } from "@tanstack/react-query";

import { queryKeys } from "../../constants/queryKeys";
import Header from "src/components/Header";
import { Carousel } from "./components/Carousel";
import ReleaseMangaCard from "./components/Cards/ReleaseMangaCard";
import MostPeriodCard from "./components/Cards/MostReadPeriodCard";
import MostReadCard from "./components/Cards/MostReadCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Parallax from "./components/Parallax";
import {
  getFeatured,
  getMostRead,
  getMostReadPeriod,
  getReleases,
} from "../../api/mangaServices";
import { RootStackScreenProps } from "src/@types/navigation";
import { useMangaQueries } from "src/hooks/useMangaQueries";

const tabsInfo: TabType[] = [
  { value: "", label: "Todos" },
  { value: "manga", label: "Mangás" },
  { value: "manhua", label: "Manhuas" },
  { value: "webtoon", label: "Webtoons" },
  { value: "novel", label: "Novels" },
];

const Home = ({ navigation }: RootStackScreenProps<"home">) => {
  const [type, setActiveTab] = useState("");
  const {
    releasesResult,
    mostReadPeriodResult,
    mostReadResult,
    featuredResult,
  } = useMangaQueries(type);

  // const [releasesResult, mostReadPeriodResult, mostReadResult, featuredResult] =
  //   useQueries({
  //     queries: [
  //       {
  //         queryKey: [queryKeys.releases, type],
  //         queryFn: () => getReleases(1, type),
  //       },
  //       {
  //         queryKey: [queryKeys.mostReadPeriod, type],
  //         queryFn: () => getMostReadPeriod(1, type),
  //       },
  //       {
  //         queryKey: [queryKeys.mostRead, type],
  //         queryFn: () => getMostRead(1, type),
  //       },
  //       {
  //         queryKey: [queryKeys.featured],
  //         queryFn: getFeatured,
  //       },
  //     ],
  //   });

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    console.log(value);
  }, []);

  const release_data_sliced = releasesResult.data?.releases
    .slice(0, 10)
    .filter(({ chapters }) => chapters.length);
  const most_read_period_sliced = mostReadPeriodResult.data?.most_read.slice(
    0,
    10
  );

  const goToScreenRelease = () => {};
  const goToScreenMostRead = () => {};
  const goToScreenMostReadPeriod = () => {
    navigation.navigate("mostReadPeriod", {
      type,
    });
  };

  const mostReadRanking = mostReadResult.data?.most_read.map(
    ({ serie_name }, i) => ({
      ranking: i + 1,
      name: serie_name,
    })
  );

  // TODO: Tratar os erros dos carrousel, ta tudo com ! la na data deles.
  return (
    <Layout>
      <Header menuShow searchShow />
      <ScrollContainer>
        <GestureHandlerRootView>
          <Parallax featured={featuredResult.data?.featured} />

          <Container>
            <Tabs
              tabs={tabsInfo}
              activeTab={type}
              onTabChange={handleTabChange}
            />
          </Container>

          <Carousel.Container>
            <Carousel.Header
              handleScreen={goToScreenRelease}
              title="Lançados Recentemente"
            />
            <Carousel.Wrapper
              data={release_data_sliced}
              loading={releasesResult.isLoading}
              card={ReleaseMangaCard}
            />
          </Carousel.Container>

          <Carousel.Container>
            <Carousel.Header
              handleScreen={goToScreenMostReadPeriod}
              title="Mais Lidos da Semana"
            />
            <Carousel.Wrapper
              data={most_read_period_sliced}
              loading={mostReadPeriodResult.isLoading}
              card={MostPeriodCard}
            />
          </Carousel.Container>

          <Carousel.Container>
            <Carousel.Header
              handleScreen={goToScreenMostRead}
              title="Mais Lidos"
            />
            <Carousel.Wrapper
              data={mostReadResult.data?.most_read}
              loading={mostReadResult.isLoading}
              card={MostReadCard}
              position={mostReadRanking}
            />
          </Carousel.Container>
        </GestureHandlerRootView>
      </ScrollContainer>
    </Layout>
  );
};

export default Home;
