import React from "react";
import { SvgProps } from "react-native-svg";
import { hs, vs } from "src/utils/metrics";
import { useTheme } from "styled-components/native";

type Props = SvgProps & {
  icon: React.FC<SvgProps>;
  type: "fill" | "stroke";
  size?: number;
};

const Icon = ({ icon: Svg, color, type, size, ...props }: Props) => {
  const theme = useTheme();

  const colorIcon = color ?? theme.TEXT_COLOR;

  if (type === "fill") {
    return (
      <Svg
        fill={colorIcon}
        {...props}
        width={size ? hs(size) : hs(24)}
        height={size ? vs(size) : vs(24)}
        viewBox={"0 0 24 24"}
      />
    );
  } else {
    return (
      <Svg
        stroke={colorIcon}
        {...props}
        width={size ? hs(size) : hs(24)}
        height={size ? vs(size) : vs(24)}
        viewBox={"0 0 24 24"}
      />
    );
  }
};

export default Icon;
