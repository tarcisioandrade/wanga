import React from "react";
import { Container, Stack } from "src/components/Layout";
import { Skeleton } from "src/components/Skeleton";

const ChapterListSkeleton = () => {
  return (
    <Container>
      <Stack direction="row" gap={12}>
        <Stack>
          <Skeleton width={120} height={168} radius={8} />
          <Skeleton mt={4} width={120} height={30} radius={8} />
        </Stack>
        <Stack gap={7} flex={1}>
          <Skeleton width="100%" height={25} radius={16} />
          <Skeleton width={120} height={15} radius={16} />
          <Stack wrap direction="row" gap={7} align_items="center">
            <Skeleton width={45} height={20} radius={8} />
            <Skeleton width={45} height={20} radius={8} />
            <Skeleton width={45} height={20} radius={8} />
            <Skeleton width={45} height={20} radius={8} />
            <Skeleton width={45} height={20} radius={8} />
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={11} gap={15}>
        <Skeleton width="100%" height={8} radius={8} />
        <Skeleton width="100%" height={8} radius={8} />
        <Skeleton width="100%" height={8} radius={8} />
        <Skeleton width="100%" height={8} radius={8} />
      </Stack>
    </Container>
  );
};

export default ChapterListSkeleton;
