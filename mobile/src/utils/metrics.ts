import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// dimensoes da tela que eu desenvolvi o app.
const guidelineBaseWidth = 392;
const guidelineBaseHeight = 781;

// horizontalScale
const hs = (size: number) => (width / guidelineBaseWidth) * size;
const phs = (size: number) => (width / guidelineBaseWidth) * size + "px";

// verticalScale
const vs = (size: number) => (height / guidelineBaseHeight) * size;
const pvs = (size: number) => (height / guidelineBaseHeight) * size + "px";

// moderateScale
const ms = (size: number, factor = 0.5) => size + (hs(size) - size) * factor;
const pms = (size: number, factor = 0.5) =>
  size + (hs(size) - size) * factor + "px";

export { hs, vs, ms, phs, pvs, pms };
