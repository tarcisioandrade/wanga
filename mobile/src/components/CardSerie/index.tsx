import React from "react";
import { Serie } from "src/@types/search";
import * as S from "./styled";
import Star from "assets/svg-icon/star.svg";
import Badge from "src/components/Badge";
import { Text } from "src/components/Text";
import { useNavigation } from "@react-navigation/native";
import BooksIcon from "assets/svg-icon/books.svg";
import Icon from "../Icon";

type Props = {
  serie: Serie;
};

const CardSerie = ({ serie }: Props) => {
  const categories = serie.categories.slice(0, 3);
  const navigator = useNavigation();

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  const imageUri = serie.cover.includes("no-cover")
    ? require("assets/images/no-asset.jpg")
    : { uri: serie.cover };

  return (
    <S.SerieWrapper onPress={() => goToMangaScreen(serie.id_serie)}>
      <S.SerieInfoContainer>
        <S.SerieImage source={imageUri} />
        {serie.chapters ? (
          <S.ChapterBox>
            <Icon type="fill" icon={BooksIcon} size={12} color="#fff" />
            <Text color="WHITE" size="FONT_3XS">
              {serie.chapters}
            </Text>
          </S.ChapterBox>
        ) : null}
        {serie.is_complete && (
          <S.BadgeStatus>
            <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_MEDIUM">
              Completo
            </Text>
          </S.BadgeStatus>
        )}
      </S.SerieInfoContainer>
      <S.SerieInfoContainer>
        <S.SerieTitle numberOfLines={3}>{serie.name}</S.SerieTitle>
        {serie.artist ? <S.Artist>{serie.artist}</S.Artist> : null}
        {categories.length ? (
          <S.BadgesContainer>
            {categories.map(({ name, id_category }) => (
              <Badge key={id_category} type="Outlined">
                {name}
              </Badge>
            ))}
          </S.BadgesContainer>
        ) : null}
      </S.SerieInfoContainer>
      <S.Score>
        <Star />
        <S.ScoreText>{serie.score || 0.0}</S.ScoreText>
      </S.Score>
    </S.SerieWrapper>
  );
};

export default CardSerie;
