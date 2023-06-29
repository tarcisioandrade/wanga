import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

type Props = SvgProps & {
  icon: React.FC<SvgProps>;
  type: "fill" | "stroke";
};

const Icon = ({ icon: Svg, color, type, ...props }: Props) => {
  const theme = useTheme();

  const fill = color ?? theme.TEXT_COLOR;

  if (type === "fill") {
    return <Svg fill={fill} {...props} />;
  } else {
    return <Svg stroke={fill} {...props} />;
  }
};

export default Icon;
