import React from "react";
import { DownloadHistory } from "src/hooks/useDownload";
import * as S from "./styled";
import { Image } from "src/components/Image";
import { Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right-iconly.svg";
import { PressableProps, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useTheme } from "styled-components";

type Props = PressableProps & {
  downloadInfo: DownloadHistory;
  navigate: (id_manga: number) => void;
  handleDeleteItems: (id: string) => void;
  deleteMode: boolean;
  checked: boolean;
};

const DownloadItem = ({
  downloadInfo,
  navigate,
  handleDeleteItems,
  deleteMode,
  checked,
  ...props
}: Props) => {
  const imageURI = downloadInfo.image
    ? { uri: downloadInfo.image }
    : require("assets/images/no-asset.jpg");

  const date = new Date(downloadInfo.downloadDate).toLocaleDateString("pt-BR");
  const theme = useTheme();

  const handleOnPressFunction = deleteMode
    ? () => handleDeleteItems(downloadInfo.id)
    : () => navigate(downloadInfo.id_manga);

  return (
    <S.DownloadItemContainer
      onPress={handleOnPressFunction}
      onLongPress={() => handleDeleteItems(downloadInfo.id)}
      {...props}
    >
      <Image
        source={imageURI}
        width={65}
        height={96}
        radius={4}
        resizeMode="cover"
      />
      <Stack flex={1} gap={10} style={{ alignSelf: "flex-start" }}>
        <Text numberOfLines={2} weight="WEIGHT_MEDIUM">
          {downloadInfo.fileName}
        </Text>
        <Text color="GRAY_600" size="FONT_2XS">
          {date}
        </Text>
        <Text color="GRAY_600" size="FONT_4XS">
          {downloadInfo.size}
        </Text>
      </Stack>
      <S.IconWrapper>
        {deleteMode ? (
          <Checkbox
            value={checked}
            color={theme.PRIMARY}
            onValueChange={() => handleDeleteItems(downloadInfo.id)}
          />
        ) : (
          <Icon icon={ArrowRight} type="stroke" color={theme.GRAY_600} />
        )}
      </S.IconWrapper>
    </S.DownloadItemContainer>
  );
};

export default DownloadItem;
