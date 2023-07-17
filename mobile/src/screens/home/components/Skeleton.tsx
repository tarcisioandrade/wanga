import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CarouselMangaCardContainer } from "../../../components/ReleaseMangaCard/styled";
import { useTheme } from "styled-components";

const Skeleton = () => {
  const theme = useTheme();
  return (
    <View style={styles.wrapper}>
      <CarouselMangaCardContainer style={styles.card}>
        <ActivityIndicator color={theme.PRIMARY} />
      </CarouselMangaCardContainer>
      <CarouselMangaCardContainer style={styles.card}>
        <ActivityIndicator color={theme.PRIMARY} />
      </CarouselMangaCardContainer>
      <CarouselMangaCardContainer style={styles.card}>
        <ActivityIndicator color={theme.PRIMARY} />
      </CarouselMangaCardContainer>
      <CarouselMangaCardContainer style={styles.card}>
        <ActivityIndicator color={theme.PRIMARY} />
      </CarouselMangaCardContainer>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 7,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#00000016",
    justifyContent: "center",
    alignItems: "center",
  },
});
