import { useRef, useEffect } from "react";
import { Animated, StyleProp, ViewStyle, Easing } from "react-native";
import { hs, vs } from "src/utils/metrics";
import { useTheme } from "styled-components";

type SkeletonProps = {
  height?: number;
  width?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

const Skeleton = ({ height, width, radius, style }: SkeletonProps) => {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.linear),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.linear),
        }),
      ])
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: theme.SKELETON_COLOR,
          width: width && hs(width),
          height: height && vs(height),
          borderRadius: radius,
        },
        { opacity: opacityAnim },
        style,
      ]}
    />
  );
};

export default Skeleton;
