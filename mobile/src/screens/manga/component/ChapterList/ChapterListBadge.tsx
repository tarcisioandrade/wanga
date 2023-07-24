import React, { memo, useState, useCallback } from "react";
import { ChapterBadgeBox, ChapterBadgeText } from "./styled";
import { useNavigation } from "@react-navigation/native";
import { getReadChapters } from "src/utils/readsChapters";
import { useFocusEffect } from "@react-navigation/native";
import { Manga } from "src/@types/manga";
import { ReadHistoric, useReadHistoric } from "src/hooks/useReadHistoric";

export type ChapterListBadgeProps = {
  manga: Manga | undefined;
  chapter_number: string;
  id_release: number;
};

const ChapterListBadge = ({
  chapter_number,
  id_release,
  manga,
}: ChapterListBadgeProps) => {
  const [lastRead, setLastRead] = useState(false);
  const [read, setRead] = useState(false);
  const { setReadHistoric } = useReadHistoric();
  const navigator = useNavigation();

  const goToMangaReaderPage = () => {
    navigator.navigate("mangaReader", {
      id_release,
      manga,
    });

    if (manga) {
      const historyObject: ReadHistoric = {
        id: manga.id_serie,
        name: manga.name,
        id_release,
        last_chapter_read: chapter_number,
        last_read_time: new Date().toISOString(),
        image: manga.image,
      };
      setReadHistoric(historyObject);
    }
  };

  const handleChaptersStatus = async () => {
    const favorites = await getReadChapters();
    setLastRead(false);
    setRead(false);

    if (favorites && manga) {
      const target = favorites.find((fav) => fav[manga.name]);

      if (target) {
        const isLastRead = target[manga.name].reads.at(-1);

        if (isLastRead === id_release) {
          setLastRead(true);
          return;
        }

        const isRead = target[manga.name].reads.some(
          (read) => read === id_release
        );
        setRead(isRead);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleChaptersStatus();
    }, [])
  );

  return (
    <ChapterBadgeBox
      style={{ justifyContent: "center" }}
      read={read}
      lastRead={lastRead}
      onPress={goToMangaReaderPage}
    >
      <ChapterBadgeText lastRead={lastRead}>{chapter_number}</ChapterBadgeText>
    </ChapterBadgeBox>
  );
};

export default memo(ChapterListBadge);
