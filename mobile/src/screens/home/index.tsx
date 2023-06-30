import React, { useState } from "react";

import { RootStackScreenProps } from "../../@types/navigation";
import { Container, Layout, ScrollContainer } from "../../components/Layout";
import Tabs, { TabType } from "../../components/Tabs";
import ReleaseCarousel from "./components/Carousels/ReleaseCarousel";
import { Release } from "../../@types/release";
import MostReadPeriodCarousel from "./components/Carousels/MostReadPeriodCarousel";
import { MostReadPeriod } from "../../@types/mostReadPeriod";

import fakeDataRelease from "../../../fakeData/saiu_hoje.json";
import fakeDataMostReadPeriod from "../../../fakeData/most_read_period.json";
import fakeDataMostRead from "../../../fakeData/most_read.json";
import { MostRead } from "../../@types/mostRead";
import MostReadCarousel from "./components/Carousels/MostReadCarousel";

const release = fakeDataRelease as Release;
const { most_read: most_read_period } =
  fakeDataMostReadPeriod as MostReadPeriod;
const { most_read } = fakeDataMostRead as MostRead;

const release_data_sliced = release.releases.slice(0, 10);
const most_read_period_sliced = most_read_period.slice(0, 10);

const tabsInfo: TabType[] = [
  { value: "", label: "Todos" },
  { value: "mangas", label: "Mangás" },
  { value: "manhuas", label: "Manhuas" },
  { value: "webtoons", label: "Webtoons" },
  { value: "novels", label: "Novels" },
];

const Home = ({ navigation }: RootStackScreenProps<"home">) => {
  const [activeTab, setActiveTab] = useState("");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    console.log(value);
  };

  return (
    <Layout>
      <ScrollContainer
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Tabs
            tabs={tabsInfo}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </Container>
        <ReleaseCarousel releases={release_data_sliced} />
        <MostReadPeriodCarousel most_read_period={most_read_period_sliced} />
        <MostReadCarousel most_read={most_read} />
      </ScrollContainer>
    </Layout>
  );
};

export default Home;
