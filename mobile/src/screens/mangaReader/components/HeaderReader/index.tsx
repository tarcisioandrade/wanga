import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Icon from "src/components/Icon";
import ArrowLeft from "assets/svg-icon/arrow-left.svg";
import DownloadIcon from "assets/svg-icon/download-simple.svg";
import CustomPressable from "src/components/CustomPressable";
import { Stack } from "src/components/Layout";
import { hs, vs } from "src/utils/metrics";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { Text } from "src/components/Text";
import { useTheme } from "styled-components";

type Props = {
  show: boolean;
  currentChapter: string | undefined;
  toggle: () => void;
};

const HeaderReader = ({ show, currentChapter, toggle }: Props) => {
  const navigator = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: show ? theme.BLACK_TRANSPARENT : "transparent",
        },
      ]}
      onTouchEnd={() => toggle()}
    >
      {show && (
        <>
          <Stack align_items="center" direction="row" gap={20}>
            <CustomPressable
              onPress={() => navigator.goBack()}
              bgPressed="#ffffff14"
            >
              <Icon type="fill" icon={ArrowLeft} color="#fff" />
            </CustomPressable>
            <Text color="WHITE" size="FONT_LG">
              {currentChapter}
            </Text>
          </Stack>
          <CustomPressable bgPressed="#ffffff14">
            <Icon type="fill" icon={DownloadIcon} color="#fff" />
          </CustomPressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: vs(50),
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hs(22),
    zIndex: 9999,
  },
});

export default HeaderReader;
