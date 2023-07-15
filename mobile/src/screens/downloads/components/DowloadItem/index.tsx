import React from "react";
import { DownloadHistory } from "src/hooks/useDownload";
import * as S from "./styled";
import { Image } from "src/components/Image";
import { Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right-iconly.svg";

type Props = {
  downloadInfo: DownloadHistory;
  navigate: (id_manga: number) => void;
};

const DownloadItem = ({ downloadInfo, navigate }: Props) => {
  const imageURI = downloadInfo.image
    ? downloadInfo.image
    : "https://github.com/tarcisioandrade.png";

  const date = new Date(downloadInfo.downloadDate).toLocaleDateString("pt-BR");

  return (
    <S.DownloadItemContainer onPress={() => navigate(downloadInfo.id_manga)}>
      <Image
        source={{
          uri: imageURI,
        }}
        width={65}
        height={96}
        radius={4}
        resizeMode="cover"
      />
      <Stack flex={1} gap={10} style={{ alignSelf: "flex-start" }}>
        <Text numberOfLines={2} weight="WEIGHT_MEDIUM">
          {downloadInfo.fileName}
        </Text>
        <Text color="DARK_700" size="FONT_2XS">
          {date}
        </Text>
        <Text color="GRAY_600" size="FONT_4XS">
          {downloadInfo.size}
        </Text>
      </Stack>

      <Icon icon={ArrowRight} type="stroke" color="#969696" />
    </S.DownloadItemContainer>
  );
};

export default DownloadItem;
