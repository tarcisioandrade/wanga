import React from "react";
import { RootStackScreenProps } from "src/@types/navigation";
import { Container, Layout, Stack } from "src/components/Layout";
import MangaHeader from "./component/MangaHeader";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getMangaInfo } from "src/api/wangaServices";
import { ChapterList } from "./component/ChapterList";
import { useChapterRequest } from "./hooks/useChaptersRequest";
import { FlatList, ActivityIndicator } from "react-native";
import { vs } from "src/utils/metrics";

const MangaScreen = ({ route }: RootStackScreenProps<"manga">) => {
  const { id } = route.params;

  const {
    data,
    error,
    isLoading: isMangaInfoLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.mangaInfo, id],
    queryFn: () => getMangaInfo(id),
  });

  const {
    chaptersData,
    isFetchingNextPage,
    loadMoreData,
    isChapterLoading,
    isErrorChapter,
  } = useChapterRequest(id);

  const isLoading = isChapterLoading || isMangaInfoLoading;

  // TODO: Tratar erro;
  if (error) {
    console.error(error);
    refetch();
    return null;
  }

  return (
    <Layout>
      <MangaHeader score={data?.manga.score} />
      <Container>
        {isLoading ? (
          <ChapterList.Skeleton />
        ) : (
          <FlatList
            data={chaptersData}
            onEndReached={loadMoreData}
            keyExtractor={(item) => item.number}
            showsVerticalScrollIndicator={false}
            initialNumToRender={60}
            maxToRenderPerBatch={60}
            getItemLayout={(_, i) => ({
              length: vs(31),
              offset: vs(31) * i,
              index: i,
            })}
            numColumns={6}
            onEndReachedThreshold={0.1}
            columnWrapperStyle={{ gap: 4 }}
            contentContainerStyle={{
              gap: 4,
              paddingBottom: vs(150),
            }}
            renderItem={({ item }) => (
              <ChapterList.Badge
                chapter_number={item.number}
                id_release={item.id_release}
                manga={data?.manga}
              />
            )}
            ListHeaderComponent={() => (
              <ChapterList.Header
                manga={data?.manga}
                chapterError={isErrorChapter}
              />
            )}
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
        )}
      </Container>
    </Layout>
  );
};

export default MangaScreen;
