import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Page } from "src/@types/page";
import WebView from "react-native-webview";
import FooterReader from "./FooterReader";
import HeaderReader from "./HeaderReader";
import { useDisclose } from "src/hooks/useDisclose";

type Props = {
  page: Page | undefined;
  close: () => void;
};

const Reader = ({ page, close }: Props) => {
  const [pageNumber, setPageNumber] = useState<number | undefined>(0);

  const images = page?.images.map(({ legacy }) => ({
    url: legacy,
  }));

  const renderImages = () => {
    return images
      ?.map(({ url }, index) => {
        return `<img src="${url}" alt="Image ${index}" style="width: 100%;" />`;
      })
      .join("");
  };

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${renderImages()}
      </body>
    </html>
  `;

  return (
    <WebView
      startInLoadingState
      onLoadEnd={() => setTimeout(() => close(), 4000)}
      onScroll={() => close()}
      renderLoading={() => (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" color="#fb5" />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
};

export default Reader;
