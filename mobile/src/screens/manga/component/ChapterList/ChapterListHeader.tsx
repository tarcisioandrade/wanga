import { Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Badge from "src/components/Badge";
import Icon from "src/components/Icon";
import { Stack } from "src/components/Layout";
import { vs } from "src/utils/metrics";
import { ChapterCount, LastReadButton } from "./styled";
import { Image } from "src/components/Image";
import { Manga } from "src/@types/manga";
import { Text } from "src/components/Text";
import ArrowDown from "assets/svg-icon/arrow-down.svg";
import ArrowUp from "assets/svg-icon/arrow-up.svg";
import BooksIcon from "assets/svg-icon/books.svg";
import ChapterListSkeleton from "./ChapterListSkeleton";
import Button from "src/components/Button";
import { getFavoriteChapters } from "src/utils/favoriteChapter";
import { useNavigation } from "@react-navigation/native";

type Props = {
  manga: Manga | undefined;
  loading: boolean;
};

const ChapterListHeader = ({ manga, loading }: Props) => {
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [lastChapterRead, setLastChapterRead] = useState<number | null>(null);

  const navigator = useNavigation();

  const handleShowDescription = () => {
    if (manga && manga?.description.length > 235) {
      setShowAllDescription((prev) => !prev);
    }
  };

  const goToLastReadChapterScreen = () => {
    if (lastChapterRead) {
      navigator.navigate("mangaReader", {
        id_release: lastChapterRead,
      });
    }
  };

  const getLastReadChapter = async () => {
    const favorites = await getFavoriteChapters();

    if (manga && favorites) {
      const currentMangaFavorite = favorites.find((fav) => fav[manga.name]);
      if (currentMangaFavorite) {
        const id_release =
          currentMangaFavorite[manga.name].reads.at(-1) ?? null;

        setLastChapterRead(id_release);
      }
    }
  };

  useEffect(() => {
    getLastReadChapter();
  }, [loading]);

  if (loading) return <ChapterListSkeleton />;
  return (
    <>
      <Stack direction="row" gap={12}>
        <Stack>
          <Image
            width={120}
            height={168}
            resizeMode="cover"
            source={{ uri: manga?.image }}
            radius={8}
          />
        </Stack>
        <Stack gap={7} flex={1}>
          <Text weight="WEIGHT_BOLD">{manga?.name}</Text>
          <Text color="GRAY_600" size="FONT_2XS">
            {manga?.author}
          </Text>

          <Stack flex={1}>
            {lastChapterRead && (
              <LastReadButton onPress={goToLastReadChapterScreen}>
                <Text size="FONT_3XS" color="WHITE" weight="WEIGHT_MEDIUM">
                  Ultimo Lido
                </Text>
              </LastReadButton>
            )}
          </Stack>
        </Stack>
      </Stack>
      <ChapterCount>
        <Icon type="fill" icon={BooksIcon} />
        <Text color="WHITE" weight="WEIGHT_EXTRABOLD" size="FONT_3XS">
          {manga?.chapters_count} Capítulos
        </Text>
      </ChapterCount>

      <Stack mt={11} wrap direction="row" gap={7} align_items="center">
        {manga?.categories.map((categ, i) => (
          <Badge type="Outlined" key={i}>
            {categ}
          </Badge>
        ))}
      </Stack>

      <Stack my={11}>
        <Pressable onPress={handleShowDescription} style={{ width: "100%" }}>
          {showAllDescription ? (
            <Text weight="WEIGHT_MEDIUM" line_height={21} size="FONT_4XS">
              {manga?.description}
            </Text>
          ) : (
            <Text
              numberOfLines={4}
              weight="WEIGHT_MEDIUM"
              line_height={21}
              size="FONT_4XS"
            >
              {manga?.description}
            </Text>
          )}
          {manga && manga?.description.length > 235 && (
            <Stack style={{ marginTop: vs(3) }}>
              {showAllDescription ? (
                <Icon
                  style={{ alignSelf: "center" }}
                  icon={ArrowUp}
                  type="stroke"
                />
              ) : (
                <Icon
                  style={{ alignSelf: "center" }}
                  icon={ArrowDown}
                  type="stroke"
                />
              )}
            </Stack>
          )}
        </Pressable>
      </Stack>
    </>
  );
};

export default ChapterListHeader;
