import React from "react";
import WebView from "react-native-webview";
import { WebViewScrollEvent } from "react-native-webview/lib/WebViewTypes";
import LoadingReader from "./LoadingReader";
import { TouchableWithoutFeedback } from "react-native";
import { setFavoriteChapter } from "src/utils/favoriteChapter";

type Props = {
  data: { url: string }[] | undefined;
  id_release: number;
  mangaName: string;
  close: () => void;
  open: () => void;
  state: boolean;
};

const Reader = ({ data, close, open, id_release, mangaName, state }: Props) => {
  let favorited = false;

  const renderImages = () => {
    return data
      ?.map(({ url }, index) => {
        return `<img src="${url}" alt="Image ${index}" style="width: 100%;" />`;
      })
      .join("");
  };

  const handleScroll = (event: WebViewScrollEvent) => {
    const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent;
    const scrollPosition = contentOffset.y + layoutMeasurement.height;
    const scrollEndOffset = contentSize.height * 0.5;

    if (state) close();

    // Chegou ao topo
    if (contentOffset.y === 0 && !state) open();

    // Chegou na metade do scroll
    if (scrollPosition >= scrollEndOffset && !favorited) {
      setFavoriteChapter(mangaName, id_release);
      favorited = true;
    }
  };

  const handleTouch = () => {
    open();
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
    <TouchableWithoutFeedback onLongPress={handleTouch}>
      <WebView
        startInLoadingState
        onLoadEnd={() => setTimeout(() => close(), 4000)}
        onScroll={handleScroll}
        renderLoading={() => <LoadingReader />}
        showsVerticalScrollIndicator={false}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
    </TouchableWithoutFeedback>
  );
};

export default Reader;
