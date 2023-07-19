import { PressableProps, Pressable } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./styled";

type Props = PressableProps & {
  children: ReactNode;
  innerSpace?: number;
  bgPressed?: string;
  radius?: number;
};

const CustomPressable = ({
  children,
  innerSpace,
  bgPressed,
  radius,
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
          radius={radius}
        >
          {children}
        </S.PressableWrapper>
      )}
    </Pressable>
  );
};

export default CustomPressable;
