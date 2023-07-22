import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Manga } from "./manga";

export type RootStackParamList = {
  home: undefined;
  search: undefined;
  downloads: undefined;
  historic: undefined;
  about: undefined;
  settings: undefined;
  category: {
    id_category: number;
    name: string;
  };
  manga: {
    id: number;
  };
  mostReadPeriod: {
    type: string;
  };
  mangaReader: {
    id_release: number;
    manga?: Manga | undefined;
  };
  release: {
    type: string;
  };
};

export type DrawerParamList = {
  drawerHome: undefined;
  drawerFavorites: undefined;
  drawerHistoric: undefined;
  drawerDownloads: undefined;
};

export type CategoryDrawerParamList = {
  drawerMenu: undefined;
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
