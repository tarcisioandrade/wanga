import React, { ElementType } from "react";
import * as S from "./styled";
import Carousel from "react-native-reanimated-carousel";
import { hs, vs } from "src/utils/metrics";
import Skeleton from "../Skeleton";
import { Text } from "src/components/Text";
import { Stack } from "src/components/Layout";
import RefreshIcon from "assets/svg-icon/refresh.svg";
import Icon from "src/components/Icon";
import { useTheme } from "styled-components";
import CustomPressable from "src/components/CustomPressable";

type CarouselWrapperProps = {
  data: any;
  loading: boolean;
  card: ElementType;
  position?: {
    name: string;
    ranking: number;
  }[];
  error: boolean;
  refresh: () => void;
};

const CarouselWrapper = ({
  card: Card,
  loading,
  data,
  position,
  error,
  refresh,
}: CarouselWrapperProps) => {
  const theme = useTheme();

  return (
    <S.CarouselWrapper bg="SECONDARY">
      {error ? (
        <Stack
          height={vs(166)}
          justify_content="center"
          align_items="center"
          gap={10}
        >
          <Text size="FONT_SM" weight="WEIGHT_MEDIUM">
            Falha no carregamento.
          </Text>
          <CustomPressable onPress={refresh}>
            <Icon icon={RefreshIcon} type="fill" color={theme.GRAY_600} />
          </CustomPressable>
        </Stack>
      ) : loading ? (
        <Skeleton />
      ) : (
        <Carousel
          width={hs(125)}
          style={{ width: "100%" }}
          height={vs(166)}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          autoFillData={false}
          loop={false}
          data={data}
          renderItem={({ item }) =>
            position ? (
              <Card data={item} position={position} />
            ) : (
              <Card data={item} />
            )
          }
        />
      )}
    </S.CarouselWrapper>
  );
};

export default CarouselWrapper;
