import { DrawerScreenProps } from "@react-navigation/drawer";

type RootStackParamList = {
  home: undefined;
  favorites: undefined;
  historic: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;
