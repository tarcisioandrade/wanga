import { useInfiniteQuery } from "@tanstack/react-query";
import { getChapters } from "src/api/wangaServices";
import { queryKeys } from "src/constants/queryKeys";

export const useChapterRequest = (id: number) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
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

  return {
    chaptersData,
    loadMoreData,
    isFetchingNextPage,
    isErrorChapter: isError,
    isChapterLoading: isLoading,
  };
};
