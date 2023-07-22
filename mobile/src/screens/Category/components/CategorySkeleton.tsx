import { View, StyleSheet } from "react-native";
import React from "react";
import Skeleton from "src/components/Skeleton";
import { SerieWrapper } from "src/components/CardSerie/styled";
import { useTheme } from "styled-components";
import { vs, hs } from "src/utils/metrics";
import { Stack } from "src/components/Layout";

const CategorySkeleton = () => {
  const theme = useTheme();

  return (
    <Stack>
      <View style={[styles.wrapper, { backgroundColor: theme.SECONDARY }]}>
        <Skeleton width={80} height={118} radius={8} />
        <Stack gap={5}>
          <Skeleton width={175} height={15} radius={8} />
          <Skeleton width={120} height={10} radius={8} />
          <Stack direction="row" gap={5} mt={10}>
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
          </Stack>
        </Stack>
      </View>

      <View style={[styles.wrapper, { backgroundColor: theme.SECONDARY }]}>
        <Skeleton width={80} height={118} radius={8} />
        <Stack gap={5}>
          <Skeleton width={175} height={15} radius={8} />
          <Skeleton width={120} height={10} radius={8} />
          <Stack direction="row" gap={5} mt={10}>
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
          </Stack>
        </Stack>
      </View>

      <View style={[styles.wrapper, { backgroundColor: theme.SECONDARY }]}>
        <Skeleton width={80} height={118} radius={8} />
        <Stack gap={5}>
          <Skeleton width={175} height={15} radius={8} />
          <Skeleton width={120} height={10} radius={8} />
          <Stack direction="row" gap={5} mt={10}>
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
          </Stack>
        </Stack>
      </View>

      <View style={[styles.wrapper, { backgroundColor: theme.SECONDARY }]}>
        <Skeleton width={80} height={118} radius={8} />
        <Stack gap={5}>
          <Skeleton width={175} height={15} radius={8} />
          <Skeleton width={120} height={10} radius={8} />
          <Stack direction="row" gap={5} mt={10}>
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
            <Skeleton width={40} height={20} radius={4} />
          </Stack>
        </Stack>
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: vs(19),
    paddingHorizontal: hs(13),
    flexDirection: "row",
    gap: 10,
  },
});
export default CategorySkeleton;
