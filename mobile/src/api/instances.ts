import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { User } from "src/@types/user";

export const mangaDBApi = axios.create({
  baseURL: process.env.MANGA_DB_API,
});

export const wangaDBApi = axios.create({
  baseURL: process.env.WANGA_API,
});

wangaDBApi.interceptors.request.use(
  async (config) => {
    const match = config.url?.includes("favorites");
    if (match) {
      const userString = await AsyncStorage.getItem("@user");

      if (userString) {
        const user = JSON.parse(userString) as User;
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
