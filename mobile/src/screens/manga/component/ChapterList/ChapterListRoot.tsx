import { ActivityIndicator, Alert, FlatList } from "react-native";
import React, { ReactElement } from "react";
import { Container, Stack } from "src/components/Layout";
import { vs } from "src/utils/metrics";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChapters } from "src/api/wangaServices";
import { queryKeys } from "src/constants/queryKeys";
import ChapterListBadge from "./ChapterListBadge";

type Props = {
  id: number;
  children: ReactElement;
  name: string | undefined;
};

const ChapterListRoot = ({ id, children, name }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: [queryKeys.chapters, id],
      queryFn: ({ pageParam = 1 }) => getChapters(id, pageParam),
      getNextPageParam: (lastPage) => {
        if (!lastPage.chapters.length) return false;
        return lastPage.current_page + 1;
      },
    });

  const chaptersData = data?.pages
    .map((page) => page.chapters)
    .flat()
    .filter((item) => item);

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // TODO: Tratar erro;
  if (error) {
    console.error(error);
    Alert.alert("Falha no servidor", "Não conseguimos carregar os capitulos.");
  }

  return (
    <Container>
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
          <ChapterListBadge
            number={item.number}
            id_release={item.id_release}
            mangaName={name}
          />
        )}
        ListHeaderComponent={children}
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
