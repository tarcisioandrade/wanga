import React from "react";
import { Container, Layout, Stack } from "src/components/Layout";
import Header from "src/components/Header";
import { RootStackScreenProps } from "src/@types/navigation";
import { useMangaQueries } from "src/hooks/useMangaQueries";
import Tabs from "src/components/Tabs";
import CardsScreenSkeleton from "../components/CardsScreenSkeleton";
import { FlatList } from "react-native";
import ReleaseMangaCard from "src/components/ReleaseMangaCard";
import { vs } from "src/utils/metrics";
import { useTabs } from "src/hooks/useTabs";

const Release = ({ route }: RootStackScreenProps<"release">) => {
  const { type: typeDefault } = route.params;
  const { typeMangaTabs, type, handleTypeTabChange } = useTabs(typeDefault);

  const {
    releasesResult: { data, error, isLoading },
  } = useMangaQueries(type, type);

  // TODO: Tratar error
  if (error) {
    console.error(error);
    return null;
  }

  return (
    <Layout>
      <Header backShow title="Lançados Recentemente" searchShow />
      <Container>
        <Stack pb={23}>
          <Tabs
            tabs={typeMangaTabs}
            activeTab={type}
            onTabChange={handleTypeTabChange}
          />
        </Stack>

        {isLoading ? (
          <CardsScreenSkeleton />
        ) : (
          <FlatList
            data={data?.releases}
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
              <ReleaseMangaCard data={item} size="sm" />
            )}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Release;
