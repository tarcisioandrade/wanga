import React from "react";
import fakeData from "../../../../../fakeData/saiu_hoje.json";
import { ReleaseElement } from "../../../../@types/release";
import {
  MangaBadge,
  MangaBadgeText,
  MangaCardContainer,
  MangaFooter,
  MangaFooterText,
  MangaImage,
} from "./styled";
import { truncateString } from "../../../../utils/truncateString";

const data = fakeData.releases[0] as ReleaseElement;

type Props = {
  releaseElement: ReleaseElement;
};

const MangaCard = ({ releaseElement }: Props) => {
  const goToMangaPage = () => {};
  const firstChapt = releaseElement.chapters.at(-1)!;
  const chapterFormat =
    Number(firstChapt.number) < 9
      ? "0" + firstChapt?.number
      : firstChapt?.number;

  return (
    <MangaCardContainer onPress={goToMangaPage}>
      <MangaBadge>
        <MangaBadgeText>{chapterFormat}, ...</MangaBadgeText>
      </MangaBadge>

      <MangaImage
        source={{
          uri: releaseElement.image,
        }}
        resizeMode="cover"
        alt={releaseElement.name}
      />

      <MangaFooter>
        <MangaFooterText>
          {truncateString(releaseElement.name, 17)}
        </MangaFooterText>
      </MangaFooter>
    </MangaCardContainer>
  );
};

export default MangaCard;
