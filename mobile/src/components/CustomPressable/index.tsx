import { PressableProps, Pressable } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./styled";

type Props = PressableProps & {
  children: ReactNode;
  innerSpace?: number;
};

const CustomPressable = ({ children, innerSpace, ...props }: Props) => {
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
        <S.PressableWrapper innerSpace={innerSpace} pressed={pressed}>
          {children}
        </S.PressableWrapper>
      )}
    </Pressable>
  );
};

export default CustomPressable;
