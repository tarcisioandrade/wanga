import React from "react";
import { ActivityIndicator, View, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Text style={{ fontSize: 24, color: "white" }}>LoadingScreen</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
