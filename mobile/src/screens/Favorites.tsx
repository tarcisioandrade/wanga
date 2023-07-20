import { View, Text, Button, Linking, ToastAndroid } from "react-native";
import React from "react";
import { Layout } from "src/components/Layout";

const Favorites = () => {
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Download Efetuado",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };
  return (
    <Layout>
      <Text>Favorites</Text>
      <Button title="Email" onPress={() => showToastWithGravityAndOffset()} />
    </Layout>
  );
};

export default Favorites;
