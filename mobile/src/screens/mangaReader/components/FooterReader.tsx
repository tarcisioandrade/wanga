import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { vs, hs } from "src/utils/metrics";
import ArrowLeftLight from "assets/svg-icon/arrow-left-iconly.svg";
import ArrowRightLight from "assets/svg-icon/arrow-right-iconly.svg";
import Icon from "src/components/Icon";
import CustomPressable from "src/components/CustomPressable";
import { useTheme } from "styled-components";

type Props = {
  show: boolean;
  nextChapter: () => void;
  prevChapter: () => void;
  hasNextChapter: boolean;
  hasPrevChapter: boolean;
};

const FooterReader = ({
  show,
  nextChapter,
  prevChapter,
  hasNextChapter,
  hasPrevChapter,
}: Props) => {
  const theme = useTheme();

  if (!show) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.BLACK_TRANSPARENT,
        },
      ]}
    >
      <CustomPressable
        bgPressed="#ffffff14"
        innerSpace={2}
        onPress={prevChapter}
        disabled={!hasPrevChapter}
      >
        <Icon
          icon={ArrowLeftLight}
          type="stroke"
          color={hasPrevChapter ? "#fff" : "#a3a3a3"}
          size={36}
        />
      </CustomPressable>

      <CustomPressable
        bgPressed="#ffffff14"
        innerSpace={2}
        onPress={nextChapter}
        disabled={!hasNextChapter}
      >
        <Icon
          icon={ArrowRightLight}
          type="stroke"
          color={hasNextChapter ? "#fff" : "#a3a3a3"}
          size={36}
        />
      </CustomPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: vs(50),
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hs(22),
    zIndex: 900,
    position: "absolute",
  },
});

export default FooterReader;
