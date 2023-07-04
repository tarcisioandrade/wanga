import React from "react";
import { RootStackScreenProps } from "src/@types/navigation";
import { Layout } from "src/components/Layout";
import MangaHeader from "./component/MangaHeader";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getMangaInfo } from "src/api/wangaServices";
import { ChapterList } from "./component/ChapterList";

const MangaScreen = ({ route }: RootStackScreenProps<"manga">) => {
  const { id } = route.params;

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.mangaInfo, id],
    queryFn: () => getMangaInfo(id),
  });

  if (error) {
    console.error(error);
    return;
  }

  return (
    <Layout>
      <MangaHeader score={data?.manga.score!} />
      <ChapterList.Root id={id} loading={isLoading} manga={data?.manga} />
    </Layout>
  );
};

export default MangaScreen;
