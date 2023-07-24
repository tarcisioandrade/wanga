import React, { useRef } from "react";
import WebView from "react-native-webview";
import { WebViewScrollEvent } from "react-native-webview/lib/WebViewTypes";
import LoadingReader from "./LoadingReader";
import { PanResponder } from "react-native";
import { setReadChapter } from "src/utils/readsChapters";

type Props = {
  data: { url: string }[] | undefined;
  id_release: number | undefined;
  mangaName: string | undefined;
  close: () => void;
  open: () => void;
  toggle: () => void;
  state: boolean;
};

const Reader = ({
  data,
  close,
  open,
  toggle,
  id_release,
  mangaName,
  state,
}: Props) => {
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
    if (scrollPosition >= scrollEndOffset && !favorited && id_release && mangaName) {
      setReadChapter(mangaName, id_release);
      favorited = true;
    }
  };

  const isScrolling = useRef(false);
  const isPressing = useRef(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      isPressing.current = true;
    },
    onPanResponderMove: (evt, gestureState) => {
      // Verifica se o movimento excede um limite, indicando que é um scroll.
      if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
        isScrolling.current = true;
      }
    },
    onPanResponderRelease: () => {
      if (!isScrolling.current && isPressing.current) {
        toggle();
      }
      isScrolling.current = false; // Reinicializa o estado de scroll
      isPressing.current = false; // Reinicializa o estado de pressionamento
    },
  });

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
      renderLoading={() => <LoadingReader />}
      showsVerticalScrollIndicator={false}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
      {...panResponder.panHandlers}
    />
  );
};

export default Reader;
