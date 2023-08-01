import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { FeaturedElement } from "src/@types/featured";
import { vs, hs } from "src/utils/metrics";
import FeaturedCard from "../Cards/FeaturedCard";
import { Stack } from "src/components/Layout";
import Skeleton from "src/components/Skeleton";
import RefreshInError from "src/components/RefreshInError";

type Props = {
  featured: FeaturedElement[] | undefined;
  error: boolean;
  refresh: () => void;
};

const Parallax = ({ featured, error, refresh }: Props) => {
  return (
    <Stack justify_content="center" align_items="center">
      {!featured ? (
        <Skeleton width={350} height={219} radius={8} />
      ) : error ? (
        <RefreshInError height={219} refresh={refresh} />
      ) : (
        <Carousel
          width={hs(350)}
          autoPlay
          autoPlayInterval={4000}
          loop
          height={vs(219)}
          style={{ width: "100%" }}
          data={featured}
          renderItem={({ item }) => <FeaturedCard data={item} />}
        />
      )}
    </Stack>
  );
};

export default Parallax;
