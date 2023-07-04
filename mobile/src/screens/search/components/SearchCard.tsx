import React from "react";
import { Serie } from "src/@types/search";
import {
  Artist,
  BadgeStatus,
  BadgesContainer,
  Score,
  ScoreText,
  SearchImage,
  SearchInfoContainer,
  SearchTitle,
  SearchWrapper,
} from "./styled";
import Star from "assets/svg-icon/star.svg";
import Badge from "src/components/Badge";
import { Text } from "src/components/Text";
import { truncateString } from "src/utils/truncateString";
import { useNavigation } from "@react-navigation/native";

type Props = {
  mangaSearch: Serie;
};

const SearchCard = ({ mangaSearch }: Props) => {
  const categories = mangaSearch.categories.slice(0, 3);
  const navigator = useNavigation();

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  const imageUri = mangaSearch.cover.includes("no-cover")
    ? require("assets/images/no-asset.jpg")
    : { uri: mangaSearch.cover };

  return (
    <SearchWrapper onPress={() => goToMangaScreen(mangaSearch.id_serie)}>
      <SearchInfoContainer>
        <SearchImage source={imageUri} />
        {mangaSearch.is_complete && (
          <BadgeStatus>
            <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_MEDIUM">
              Completo
            </Text>
          </BadgeStatus>
        )}
      </SearchInfoContainer>
      <SearchInfoContainer>
        <SearchTitle>{truncateString(mangaSearch.name, 55)}</SearchTitle>
        {mangaSearch.artist ? <Artist>{mangaSearch.artist}</Artist> : null}
        {categories.length ? (
          <BadgesContainer>
            {categories.map(({ name, id_category }) => (
              <Badge key={id_category}>{name}</Badge>
            ))}
          </BadgesContainer>
        ) : null}
      </SearchInfoContainer>
      <Score>
        <Star />
        <ScoreText>{mangaSearch.score || 0.0}</ScoreText>
      </Score>
    </SearchWrapper>
  );
};

export default SearchCard;
