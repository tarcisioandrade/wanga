import { View, Text, Button, Linking, ToastAndroid } from "react-native";
import React from "react";
import { Layout } from "src/components/Layout";
import Header from "src/components/Header";

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
      <Header menuShow logoShow searchShow categoryShow />
      <Text>Favorites</Text>
      <Button title="Email" onPress={() => showToastWithGravityAndOffset()} />
    </Layout>
  );
};

export default Favorites;
