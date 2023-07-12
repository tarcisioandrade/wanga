import axios from "axios";
import { Manga } from "src/@types/manga";
import { ChapterBody } from "src/@types/chapters";
import { Page } from "src/@types/page";

interface MangaInfoResponse {
  manga: Manga;
}

export async function getMangaInfo(id: number) {
  const res = await axios.get<MangaInfoResponse>(
    `http://192.168.0.64:8080/manga/${id}`
  );

  return res.data;
}

export async function getChapters(id: number, page: number = 1) {
  const res = await axios.get<ChapterBody>(
    `http://192.168.0.64:8080/chapters/${id}/${page}`
  );

  return res.data;
}

export async function getPages(id: number) {
  const res = await axios.get<Page>(`http://192.168.0.64:8080/pages/${id}`);

  return res.data;
}
