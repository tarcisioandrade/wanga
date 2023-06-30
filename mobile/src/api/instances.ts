import axios from "axios";

export const mangaDBApi = axios.create({
  baseURL: process.env.MANGA_DB_API,
});

export const wangaDBApi = axios.create({
  baseURL: "",
});
