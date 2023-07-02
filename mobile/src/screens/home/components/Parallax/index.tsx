import { ActivityIndicator } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { FeaturedElement } from "src/@types/featured";
import { vs, hs } from "src/utils/metrics";
import FeaturedCard from "../Cards/FeaturedCard";
import { FeaturedSkeleton } from "../Cards/FeaturedCard/styled";
import { Stack } from "src/components/Layout";

type Props = {
  featured: FeaturedElement[] | undefined;
};

const Parallax = ({ featured }: Props) => {
  return (
    <Stack justify_content="center" align_items="center">
      {!featured ? (
        <FeaturedSkeleton>
          <ActivityIndicator size="large" />
        </FeaturedSkeleton>
      ) : (
        <Carousel
          width={hs(350)}
          autoPlay
          autoPlayInterval={4000}
          loop
          height={vs(228)}
          style={{ width: "100%" }}
          data={featured}
          renderItem={({ item }) => <FeaturedCard data={item} />}
        />
      )}
    </Stack>
  );
};

export default Parallax;
