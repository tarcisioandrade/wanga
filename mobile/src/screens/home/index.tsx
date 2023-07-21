import React, { useState } from "react";
import { Container, Layout, ScrollContainer } from "src/components/Layout";
import Tabs from "src/components/Tabs";
import Header from "src/components/Header";
import { Carousel } from "./components/Carousel";
import ReleaseMangaCard from "../../components/ReleaseMangaCard";
import MostPeriodCard from "./components/Cards/MostReadPeriodCard";
import MostReadCard from "./components/Cards/MostReadCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Parallax from "./components/Parallax";
import { RootStackScreenProps } from "src/@types/navigation";
import { useMangaQueries } from "src/hooks/useMangaQueries";
import { useTabs } from "src/hooks/useTabs";
import { RefreshControl } from "react-native";

const Home = ({ navigation }: RootStackScreenProps<"home">) => {
  const [refreshing, setRefreshing] = useState(false);
  const { typeMangaTabs, type, handleTypeTabChange } = useTabs("");

  const {
    releasesResult,
    mostReadPeriodResult,
    mostReadResult,
    featuredResult,
  } = useMangaQueries(type);

  const release_data_sliced = releasesResult.data?.releases
    .slice(0, 10)
    .filter(({ chapters }) => chapters.length);
  const most_read_period_sliced = mostReadPeriodResult.data?.most_read.slice(
    0,
    10
  );

  const goToScreenRelease = () => {
    navigation.navigate("release", {
      type,
    });
  };

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

  const onRefresh = async () => {
    if (!refreshing) {
      setRefreshing(true);
      Promise.all([
        releasesResult.refetch(),
        mostReadPeriodResult.refetch(),
        mostReadResult.refetch(),
      ]).finally(() => setRefreshing(false));
    }
  };

  const releaseLoading = refreshing || releasesResult.isLoading;
  const mostPeriodResultLoading = refreshing || mostReadPeriodResult.isLoading;
  const mostReadLoading = refreshing || mostReadResult.isLoading;

  return (
    <Layout>
      <Header menuShow logoShow searchShow categoryShow />
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <GestureHandlerRootView>
          <Parallax featured={featuredResult.data?.featured} />

          <Container>
            <Tabs
              tabs={typeMangaTabs}
              activeTab={type}
              onTabChange={handleTypeTabChange}
            />
          </Container>

          <Carousel.Container>
            <Carousel.Header
              handleScreen={goToScreenRelease}
              title="🔥 Lançados Recentemente"
            />
            <Carousel.Wrapper
              data={release_data_sliced}
              loading={releaseLoading}
              card={ReleaseMangaCard}
              error={releasesResult.isError}
              refresh={releasesResult.refetch}
            />
          </Carousel.Container>

          <Carousel.Container>
            <Carousel.Header
              handleScreen={goToScreenMostReadPeriod}
              title="🤩 Mais Lidos da Semana"
            />
            <Carousel.Wrapper
              data={most_read_period_sliced}
              loading={mostPeriodResultLoading}
              card={MostPeriodCard}
              error={mostReadPeriodResult.isError}
              refresh={mostReadPeriodResult.refetch}
            />
          </Carousel.Container>

          <Carousel.Container>
            <Carousel.Header title="🏅 Populares" />
            <Carousel.Wrapper
              data={mostReadResult.data?.most_read}
              loading={mostReadLoading}
              card={MostReadCard}
              position={mostReadRanking}
              error={mostReadResult.isError}
              refresh={mostReadResult.refetch}
            />
          </Carousel.Container>
        </GestureHandlerRootView>
      </ScrollContainer>
    </Layout>
  );
};

export default Home;
