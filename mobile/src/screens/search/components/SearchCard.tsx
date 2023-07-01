import React from "react";
import { Serie } from "src/@types/search";
import {
  Artist,
  BadgesContainer,
  Score,
  ScoreText,
  SearchImage,
  SearchInfoContainer,
  SearchTitle,
  SearchWrapper,
} from "./styled";
import Star from "assets/svg-icon/star.svg";
import BadgePrimary from "src/components/Badge";

type Props = {
  mangaSearch: Serie;
};
const SearchCard = ({ mangaSearch }: Props) => {
  const categories = mangaSearch.categories.slice(0, 3);

  const goToMangaScreen = () => {};

  return (
    <SearchWrapper onPress={goToMangaScreen}>
      <SearchImage
        source={{
          uri: mangaSearch.cover,
        }}
      />
      <SearchInfoContainer>
        <SearchTitle>{mangaSearch.name}</SearchTitle>
        {mangaSearch.artist ? <Artist>{mangaSearch.artist}</Artist> : null}
        {categories.length ? (
          <BadgesContainer>
            {categories.map(({ name, id_category }) => (
              <BadgePrimary key={id_category}>{name}</BadgePrimary>
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
