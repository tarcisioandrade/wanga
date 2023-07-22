import { ActivityIndicator } from "react-native";
import React from "react";
import { RootStackScreenProps } from "src/@types/navigation";
import { Container, Layout, Stack } from "src/components/Layout";
import Header from "src/components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getCategoriesSeries } from "src/api/mangaServices";
import CardSerie from "../../components/CardSerie";
import { vs } from "src/utils/metrics";
import { FlashList } from "@shopify/flash-list";
import CategorySkeleton from "./components/CategorySkeleton";

const Category = ({ route }: RootStackScreenProps<"category">) => {
  const { id_category, name } = route.params;
  const {
    data,
    hasNextPage,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.categoriesSeries, id_category],
    queryFn: ({ pageParam = 1 }) => getCategoriesSeries(id_category, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.series.length === 0) return false;
      return lastPage.nextPage;
    },
  });
  const series = data?.pages.map((page) => page.series).flat();

  const requestNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // TODO: Tratar Erro
  if (error) {
    console.error(JSON.stringify(error, null, 2));
    return null;
  }
  
  return (
    <Layout>
      <Header backShow title={name} />
      <Container style={{ flex: 1 }}>
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <FlashList
            keyExtractor={(item) => item.id_serie.toString()}
            data={series}
            renderItem={({ item }) => <CardSerie serie={item} />}
            onEndReachedThreshold={0.8}
            estimatedItemSize={30}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: vs(100),
            }}
            onEndReached={requestNextPage}
            ListFooterComponent={
              isFetchingNextPage ? (
                <Stack
                  mt={15}
                  justify_content="center"
                  flex={1}
                  align_items="center"
                >
                  <ActivityIndicator />
                </Stack>
              ) : null
            }
          />
        )}
      </Container>
    </Layout>
  );
};

export default Category;
