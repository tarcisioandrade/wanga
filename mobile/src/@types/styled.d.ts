import "styled-components/native";
import { lightTheme } from "../theme/theme";

// and extend them!
declare module "styled-components/native" {
  type Theme = typeof lightTheme;
  export interface DefaultTheme extends Theme {}
}
