import { PressableProps, Alert } from "react-native";
import React from "react";
import { Favorite } from "src/@types/favorite";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getMangaInfo } from "src/api/wangaServices";
import { Image } from "src/components/Image";
import { Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right-iconly.svg";
import Checkbox from "expo-checkbox";
import { useTheme } from "styled-components";
import {
  DownloadItemContainer,
  IconWrapper,
} from "src/screens/downloads/components/DowloadItem/styled";

type Props = PressableProps & {
  favorite: Favorite;
  navigate: (id_manga: number) => void;
  handleDeleteItems: (id: string) => void;
  deleteMode: boolean;
  checked: boolean;
};

const FavoriteItem = ({
  favorite,
  handleDeleteItems,
  deleteMode,
  checked,
  navigate,
  ...props
}: Props) => {
  const { data, isError } = useQuery({
    queryKey: [queryKeys.mangaInfo, favorite.id_serie],
    queryFn: () => getMangaInfo(favorite.id_serie),
  });

  const theme = useTheme();

  const imageURI = data?.manga.image
    ? { uri: data.manga.image }
    : require("assets/images/no-asset.jpg");

  const handleOnPressFunction = deleteMode
    ? () => handleDeleteItems(favorite.id)
    : () => navigate(favorite.id_serie);

  if (isError) {
    Alert.alert("Server Error", "Alguma coisa deu errada, tente novamente.");
  }

  return (
    <DownloadItemContainer
      onPress={handleOnPressFunction}
      onLongPress={() => handleDeleteItems(favorite.id)}
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
          {data?.manga.name}
        </Text>
        <Text numberOfLines={2} color="GRAY_600" size="FONT_2XS">
          {data?.manga.author}
        </Text>
      </Stack>
      <IconWrapper>
        {deleteMode ? (
          <Checkbox
            value={checked}
            color={theme.PRIMARY}
            onValueChange={() => handleDeleteItems(favorite.id)}
          />
        ) : (
          <Icon icon={ArrowRight} type="stroke" color={theme.GRAY_600} />
        )}
      </IconWrapper>
    </DownloadItemContainer>
  );
};

export default FavoriteItem;
