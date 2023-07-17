import React from "react";
import { Skeleton } from "src/components/Skeleton";
import { Stack } from "src/components/Layout";

const CardsScreenSkeleton = () => {
  return (
    <Stack direction="row" gap={9} wrap>
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
      <Skeleton width={110} height={157} radius={8} />
    </Stack>
  );
};

export default CardsScreenSkeleton;
