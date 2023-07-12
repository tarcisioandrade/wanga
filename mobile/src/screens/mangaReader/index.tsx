import React, { useState } from "react";
import { RootStackScreenProps } from "src/@types/navigation";
import { Layout } from "src/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getPages } from "src/api/wangaServices";
import { StatusBar } from "react-native";
import Reader from "./components/Reader";
import { useDisclose } from "src/hooks/useDisclose";
import FooterReader from "./components/FooterReader";
import HeaderReader from "./components/HeaderReader";

const MangaReader = ({ route }: RootStackScreenProps<"mangaReader">) => {
  const { id } = route.params;
  const [chapter, setChapter] = useState(id);
  const { state, close, toggle } = useDisclose(true);

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.pages, chapter],
    queryFn: () => getPages(chapter),
  });

  const hasNextChapter = !!data?.next_chapter.release_id;
  const hasPrevChapter = !!data?.prev_chapter.release_id;

  const nextChapter = () => {
    if (data && hasNextChapter) {
      setChapter(Number(data.next_chapter.release_id));
    }
  };

  const prevChapter = () => {
    if (data && hasPrevChapter) {
      setChapter(Number(data.prev_chapter.release_id));
    }
  };

  if (error) {
    console.error(error);
    return null;
  }

  if (isLoading) return null;
  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar hidden />
      <HeaderReader
        show={state}
        toggle={toggle}
        currentChapter={data?.chapter_number}
      />
      <Reader page={data} close={close} />
      <FooterReader
        toggle={toggle}
        show={state}
        nextChapter={nextChapter}
        prevChapter={prevChapter}
        hasNextChapter={hasNextChapter}
        hasPrevChapter={hasPrevChapter}
      />
    </Layout>
  );
};

export default MangaReader;
