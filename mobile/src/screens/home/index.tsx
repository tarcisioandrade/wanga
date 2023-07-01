import React, { useState } from "react";

import { Container, Layout, ScrollContainer } from "../../components/Layout";
import Tabs, { TabType } from "../../components/Tabs";
import { useQueries } from "@tanstack/react-query";

import {
  getMostRead,
  getMostReadPeriod,
  getReleases,
} from "../../api/mangaServices";
import { queryKeys } from "../../constants/queryKeys";
import Header from "../../components/Header";
import { Carousel } from "./components/Carousel";
import ReleaseMangaCard from "./components/Cards/ReleaseMangaCard";
import MostPeriodCard from "./components/Cards/MostReadPeriodCard";
import MostReadCard from "./components/Cards/MostReadCard";

const tabsInfo: TabType[] = [
  { value: "", label: "Todos" },
  { value: "manga", label: "Mangás" },
  { value: "manhua", label: "Manhuas" },
  { value: "webtoon", label: "Webtoons" },
  { value: "novel", label: "Novels" },
];

const Home = () => {
  const [type, setActiveTab] = useState("");

  const [releasesResult, mostReadPeriodResult, mostReadResult] = useQueries({
    queries: [
      {
        queryKey: [queryKeys.releases, type],
        queryFn: () => getReleases(1, type),
      },
      {
        queryKey: [queryKeys.mostReadPeriod, type],
        queryFn: () => getMostReadPeriod(1, type),
      },
      {
        queryKey: [queryKeys.mostRead, type],
        queryFn: () => getMostRead(1, type),
      },
    ],
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    console.log(value);
  };

  const release_data_sliced = releasesResult.data?.releases.slice(0, 10);
  const most_read_period_sliced = mostReadPeriodResult.data?.most_read.slice(
    0,
    10
  );

  const goToScreenRelease = () => {};
  const goToScreenMostRead = () => {};
  const goToScreenMostReadPeriod = () => {};

  const mostReadRanking = mostReadResult.data?.most_read.map(
    ({ serie_name }, i) => ({
      ranking: i + 1,
      name: serie_name,
    })
  );

  // TO DO: Tratar os erros dos carrousel, ta tudo com ! la na data deles.
  return (
    <Layout>
      <Header />
      <ScrollContainer>
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
            title="Lançados Recentemente"
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
      </ScrollContainer>
    </Layout>
  );
};

export default Home;
