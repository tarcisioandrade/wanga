import React, { memo } from "react";
import { ChapterBadgeBox, ChapterBadgeText } from "./styled";
import { useNavigation } from "@react-navigation/native";

export type ChapterListBadgeProps = {
  read?: boolean;
  lastRead?: boolean;
  number: string;
  id_release: number;
};

const ChapterListBadge = memo(
  ({ number, id_release }: ChapterListBadgeProps) => {
    const navigator = useNavigation();

    const goToMangaReaderPage = () => {
      navigator.navigate("mangaReader", {
        id: id_release,
      });
    };

    return (
      <ChapterBadgeBox onPress={goToMangaReaderPage}>
        <ChapterBadgeText>{number}</ChapterBadgeText>
      </ChapterBadgeBox>
    );
  }
);

export default ChapterListBadge;
