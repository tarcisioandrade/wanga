import React, { memo, useState, useCallback } from "react";
import { ChapterBadgeBox, ChapterBadgeText } from "./styled";
import { useNavigation } from "@react-navigation/native";
import { getFavoriteChapters } from "src/utils/favoriteChapter";
import { useFocusEffect } from "@react-navigation/native";

export type ChapterListBadgeProps = {
  mangaName: string | undefined;
  read?: boolean;
  lastRead?: boolean;
  number: string;
  id_release: number;
  id: number;
};

const ChapterListBadge = ({
  number,
  id_release,
  mangaName,
  id
}: ChapterListBadgeProps) => {
  const [lastRead, setLastRead] = useState(false);
  const [read, setRead] = useState(false);

  const navigator = useNavigation();

  const goToMangaReaderPage = () => {
    navigator.navigate("mangaReader", {
      id_release,
      id_manga: id
    });
  };

  const handleChaptersStatus = async () => {
    const favorites = await getFavoriteChapters();
    setLastRead(false);
    setRead(false);

    if (favorites && mangaName) {
      const target = favorites.find((fav) => fav[mangaName]);

      if (target) {
        const isLastRead = target[mangaName].reads.at(-1);

        if (isLastRead === id_release) {
          setLastRead(true);
          return;
        }

        const isRead = target[mangaName].reads.some(
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
      <ChapterBadgeText lastRead={lastRead}>{number}</ChapterBadgeText>
    </ChapterBadgeBox>
  );
};

export default memo(ChapterListBadge);
