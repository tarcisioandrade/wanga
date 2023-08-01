import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Container, Stack } from "../Layout";
import Animated from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/queryKeys";
import { getCategoriesList } from "src/api/mangaServices";
import { Text } from "../Text";
import * as S from "./styled";
import ArrowRightIconly from "assets/svg-icon/arrow-right-iconly.svg";
import BooksIcon from "assets/svg-icon/books.svg";
import Icon from "../Icon";
import { vs } from "src/utils/metrics";
import { CategoryElement } from "src/@types/category";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from "@react-navigation/drawer";
import RefreshInError from "../RefreshInError";

const CategoryDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [queryKeys.categories],
    queryFn: getCategoriesList,
  });

  const progress = useDrawerProgress();

  // @ts-expect-error
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const goToCategoryPage = (id_category: number, name: string) => {
    navigation.navigate("category", {
      id_category,
      name,
    });
  };

  // TODO: Colocar crashalytics
  if (error) {
    console.error(error);
  }

  if (isLoading) return null;
  return (
    <S.DrawerCategoryContainer style={{ transform: [{ translateX }] }}>
      <Container style={{ flex: 1 }}>
        {isError ? (
          <RefreshInError refresh={refetch} />
        ) : (
          <FlashList
            data={data?.categories_list}
            keyExtractor={(item) => item.id_category.toString()}
            estimatedItemSize={55}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: vs(15) }} />}
            contentContainerStyle={{
              paddingBottom: vs(70),
            }}
            ListHeaderComponent={() => (
              <Text weight="WEIGHT_SEMIBOLD" style={{ marginBottom: vs(16) }}>
                Categorias
              </Text>
            )}
            renderItem={({ item }) => (
              <CategoryItem category={item} handlePress={goToCategoryPage} />
            )}
          />
        )}
      </Container>
    </S.DrawerCategoryContainer>
  );
};

type CategoryItemProps = {
  category: CategoryElement;
  handlePress: (id: number, name: string) => void;
};

const CategoryItem = memo(({ category, handlePress }: CategoryItemProps) => {
  const theme = useTheme();

  return (
    <S.CategoryItem
      onPress={() => handlePress(category.id_category, category.name)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Stack
        direction="row"
        align_items="center"
        justify_content="center"
        gap={16}
      >
        <Text size="FONT_3XS" style={{ width: 90 }}>
          {category.name}
        </Text>
        <S.AmountBox>
          <Icon type="fill" icon={BooksIcon} size={14} color={theme.WHITE} />
          <Text size="FONT_3XS" color="WHITE">
            {category.titles}
          </Text>
        </S.AmountBox>
      </Stack>
      <Icon type="stroke" icon={ArrowRightIconly} color={theme.GRAY_600} />
    </S.CategoryItem>
  );
});

export default CategoryDrawer;
