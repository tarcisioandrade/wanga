import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  home: undefined;
  search: undefined;
  manga: {
    id: number;
  };
  mostReadPeriod: {
    type: string;
  };
  mangaReader: {
    id_release: number;
  };
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
  NativeStackScreenProps<RootStackParamList, T>;

export type RootDrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T>;
