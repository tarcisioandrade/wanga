import { PressableProps, Pressable } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./styled";
import { DefaultTheme } from "styled-components";

type Props = PressableProps & {
  children: ReactNode;
  innerSpace?: number;
  bgPressed?: string;
};

const CustomPressable = ({
  children,
  innerSpace,
  bgPressed,
  ...props
}: Props) => {
  return (
    <Pressable
      {...props}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
    >
      {({ pressed }) => (
        <S.PressableWrapper
          innerSpace={innerSpace}
          pressed={pressed}
          bgPressed={bgPressed}
        >
          {children}
        </S.PressableWrapper>
      )}
    </Pressable>
  );
};

export default CustomPressable;
