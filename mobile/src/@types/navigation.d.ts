import { DrawerScreenProps } from "@react-navigation/drawer";

export type RootStackParamList = {
  home: undefined;
  search: undefined;
};

export type DrawerParamList = {
  drawerHome: undefined;
  drawerFavorites: undefined;
  drawerHistoric: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;
