import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "styled-components";

const LoadingReader = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <ActivityIndicator size="large" color={theme.PRIMARY} />
    </View>
  );
};

export default LoadingReader;
