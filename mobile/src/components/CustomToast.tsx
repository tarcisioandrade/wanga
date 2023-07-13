import React from "react";
import { BaseToast, BaseToastProps } from "react-native-toast-message";
import { ms } from "src/utils/metrics";
import { useTheme } from "styled-components";

const CustomToast = (props: BaseToastProps) => {
  const theme = useTheme();

  return (
    <BaseToast
      {...props}
      style={{ backgroundColor: theme.SECONDARY, height: 50 }}
      text1Style={{
        color: theme.TEXT_COLOR,
        fontWeight: "bold",
        fontSize: ms(15),
      }}
    />
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <CustomToast {...props} />,
};
