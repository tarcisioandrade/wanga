import { Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { Container, Stack } from "src/components/Layout";
import { vs } from "src/utils/metrics";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChapters } from "src/api/wangaServices";
import { queryKeys } from "src/constants/queryKeys";
import ChapterListBadge from "./ChapterListBadge";
import ChapterListSkeleton from "./ChapterListSkeleton";
import ChapterListHeader from "./ChapterListHeader";
import { Manga } from "src/@types/manga";

type Props = {
  id: number;
  loading: boolean;
  manga: Manga | undefined;
};

const ChapterListRoot = ({ id, manga, loading }: Props) => {
  const {
    data: chaptersResult,
    isLoading: chapterLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.chapters, id],
    queryFn: ({ pageParam = 1 }) => getChapters(id, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.chapters.length < 30) return false;
      return lastPage.current_page + 1;
    },
  });

  const chaptersData = chaptersResult?.pages
    .map((page) => page.chapters)
    .flat();

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const loadingSkeleton = loading && chapterLoading;

  if (loadingSkeleton) return <ChapterListSkeleton />;
  return (
    <Container>
      <FlatList
        data={chaptersData}
        onEndReached={loadMoreData}
        keyExtractor={(item) => item.id_release.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        numColumns={5}
        onEndReachedThreshold={0.6}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{
          gap: 4,
          paddingBottom: vs(150),
        }}
        renderItem={({ item }) => (
          <ChapterListBadge number={item.number} id_release={item.id_release} />
        )}
        ListHeaderComponent={<ChapterListHeader manga={manga} />}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Stack
              mt={10}
              justify_content="center"
              flex={1}
              align_items="center"
            >
              <ActivityIndicator />
            </Stack>
          ) : null
        }
      />
    </Container>
  );
};

export default ChapterListRoot;
