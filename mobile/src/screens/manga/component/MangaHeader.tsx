import React from "react";
import { Container, Stack } from "src/components/Layout";
import { HeaderContainer } from "src/components/Header/styled";
import ArrowLeft from "assets/svg-icon/arrow-left.svg";
import Icon from "src/components/Icon";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FavoriteIconNoFill from "assets/svg-icon/favorite-no-fill.svg";
import FavoriteFill from "assets/svg-icon/favorite-fill.svg";
import { useTheme } from "styled-components";
import { Text } from "src/components/Text";
import StarIcon from "assets/svg-icon/star.svg";

type Props = {
  score: string;
};

const MangaHeader = ({ score }: Props) => {
  const navigator = useNavigation();
  const theme = useTheme();

  const hasFavorited = true;
  const favoriteManga = () => {};
  const unfavoriteManga = () => {};

  return (
    <Container bg="BG_COLOR">
      <HeaderContainer>
        <Stack direction="row" gap={15} align_items="center">
          <Pressable onPress={navigator.goBack}>
            <Icon type="fill" icon={ArrowLeft} />
          </Pressable>
          <Stack direction="row" align_items="center" gap={2}>
            <Text size="FONT_SM">{score}</Text>
            <StarIcon />
          </Stack>
        </Stack>
        {hasFavorited ? (
          <Pressable onPress={unfavoriteManga}>
            <Icon type="fill" color={theme.RED_500} icon={FavoriteFill} />
          </Pressable>
        ) : (
          <Pressable onPress={favoriteManga}>
            <Icon type="stroke" icon={FavoriteIconNoFill} />
          </Pressable>
        )}
      </HeaderContainer>
    </Container>
  );
};

export default MangaHeader;
