import React from "react";
import {
  BadgesContainer,
  SerieInfoContainer,
} from "src/components/CardSerie/styled";

import { Stack } from "src/components/Layout";
import Skeleton from "src/components/Skeleton";

const SearchSkeleton = () => {
  return (
    <Stack gap={10} px={13} py={19} direction="row">
      <SerieInfoContainer>
        <Skeleton width={80} height={118} radius={8} />
      </SerieInfoContainer>

      <SerieInfoContainer>
        <Skeleton width={220} height={22} radius={16} />
        <BadgesContainer>
          <Skeleton width={45} height={25} radius={8} />
          <Skeleton width={45} height={25} radius={8} />
          <Skeleton width={45} height={25} radius={8} />
          <Skeleton width={45} height={25} radius={8} />
        </BadgesContainer>
      </SerieInfoContainer>
    </Stack>
  );
};

export default SearchSkeleton;
