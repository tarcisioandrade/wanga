import React, { useState } from "react";

import { Container, Layout, ScrollContainer } from "../../components/Layout";
import Tabs, { TabType } from "../../components/Tabs";
import ReleaseCarousel from "./components/Carousels/ReleaseCarousel";
import MostReadPeriodCarousel from "./components/Carousels/MostReadPeriodCarousel";
import { useQueries } from "@tanstack/react-query";

import MostReadCarousel from "./components/Carousels/MostReadCarousel";
import {
  getMostRead,
  getMostReadPeriod,
  getReleases,
} from "../../api/mangaServices";
import { queryKeys } from "../../constants/queryKeys";
import Header from "../../components/Header";

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

        <ReleaseCarousel
          releases={release_data_sliced!}
          loading={releasesResult.isLoading}
        />

        <MostReadPeriodCarousel
          most_read_period={most_read_period_sliced!}
          loading={mostReadPeriodResult.isLoading}
        />

        <MostReadCarousel
          most_read={mostReadResult.data?.most_read}
          loading={mostReadPeriodResult.isLoading}
        />
      </ScrollContainer>
    </Layout>
  );
};

export default Home;
