import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "src/components/Skeleton";

const CarouselSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <Skeleton width={117} height={166} radius={8} />
      <Skeleton width={117} height={166} radius={8} />
      <Skeleton width={117} height={166} radius={8} />
      <Skeleton width={117} height={166} radius={8} />
    </View>
  );
};

export default CarouselSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 7,
    overflow: "hidden",
  },
});
