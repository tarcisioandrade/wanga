import React from "react";
import { vs } from "src/utils/metrics";
import CustomPressable from "./CustomPressable";
import Icon from "./Icon";
import { Stack } from "./Layout";
import { Text } from "./Text";
import RefreshIcon from "assets/svg-icon/refresh.svg";
import { useTheme } from "styled-components";

type Props = {
  refresh: () => void;
  height?: number;
};
const RefreshInError = ({ refresh, height = 166 }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      height={vs(height)}
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
  );
};

export default RefreshInError;
