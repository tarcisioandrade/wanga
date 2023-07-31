import React from "react";
import { BaseToast, BaseToastProps } from "react-native-toast-message";
import { ms } from "src/utils/metrics";
import { useTheme } from "styled-components";

type CustomToastProps = BaseToastProps & {
  type?: "error" | "success" | "info";
};

const CustomToast = ({ type, ...props }: CustomToastProps) => {
  const theme = useTheme();

  const borderColors = {
    error: theme.RED_500,
    success: theme.GREEN_500,
    info: theme.PRIMARY,
  };

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: theme.SECONDARY,
        borderLeftColor: type && borderColors[type],
      }}
      text1Style={{
        color: theme.TEXT_COLOR,
        fontWeight: "bold",
        fontSize: ms(15),
      }}
      text2Style={{
        fontSize: ms(11),
      }}
      text2NumberOfLines={2}
    />
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <CustomToast {...props} type="success" />,
  error: (props: BaseToastProps) => <CustomToast {...props} type="error" />,
  info: (props: BaseToastProps) => <CustomToast {...props} type="info" />,
};
