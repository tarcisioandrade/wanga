import { PressableProps } from "react-native";
import React from "react";
import { ReadHistoric } from "src/hooks/useReadHistoric";
import { Image } from "src/components/Image";
import { Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import { formattDatePassed } from "src/utils/formatDate";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right-iconly.svg";
import Checkbox from "expo-checkbox";
import { useTheme } from "styled-components";
import {
  DownloadItemContainer,
  IconWrapper,
} from "src/screens/downloads/components/DowloadItem/styled";

type Props = PressableProps & {
  historic: ReadHistoric;
  navigate: (id_manga: number) => void;
  handleDeleteItems: (id: string) => void;
  deleteMode: boolean;
  checked: boolean;
};

const HistoricItem = ({
  historic,
  navigate,
  handleDeleteItems,
  deleteMode,
  checked,
  ...props
}: Props) => {
  const theme = useTheme();
  const imageURI = historic.image
    ? { uri: historic.image }
    : require("assets/images/no-asset.jpg");

  const handleOnPressFunction = deleteMode
    ? () => handleDeleteItems(historic.id)
    : () => navigate(Number(historic.id));

  const time = `Há ${formattDatePassed(historic.last_read_time)}`;
  return (
    <DownloadItemContainer
      onPress={handleOnPressFunction}
      onLongPress={() => handleDeleteItems(historic.id)}
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
          {historic.name}
        </Text>
        <Text color="GRAY_600" size="FONT_2XS">
          Cápitulo: {historic.last_chapter_read}
        </Text>
        <Text color="WARNING" weight="WEIGHT_BOLD" size="FONT_4XS">
          {time}
        </Text>
      </Stack>
      <IconWrapper>
        {deleteMode ? (
          <Checkbox
            value={checked}
            color={theme.PRIMARY}
            onValueChange={() => handleDeleteItems(historic.id)}
          />
        ) : (
          <Icon icon={ArrowRight} type="stroke" color={theme.GRAY_600} />
        )}
      </IconWrapper>
    </DownloadItemContainer>
  );
};

export default HistoricItem;
