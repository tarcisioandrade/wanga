import { View, ActivityIndicator } from "react-native";
import React from "react";
import { Page } from "src/@types/page";
import WebView from "react-native-webview";
import { WebViewScrollEvent } from "react-native-webview/lib/WebViewTypes";
import { useTheme } from "styled-components";

type Props = {
  page: Page | undefined;
  close: () => void;
};

const Reader = ({ page, close }: Props) => {
  const theme = useTheme();

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

  const handleScroll = (event: WebViewScrollEvent) => {
    close();
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
      onScroll={handleScroll}
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
          <ActivityIndicator size="large" color={theme.PRIMARY} />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
};

export default Reader;
