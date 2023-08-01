import { Manga } from "src/@types/manga";
import { ChapterBody } from "src/@types/chapters";
import { Page } from "src/@types/page";
import { SignupUser } from "src/screens/Register";
import { User } from "src/@types/user";
import { SigninUser } from "src/screens/Login";
import { SigninGoogleInput } from "src/screens/Login/hooks/useAuth";
import { FavoriteBody } from "src/@types/favorite";
import { wangaDBApi } from "./instances";

interface MangaInfoResponse {
  manga: Manga;
}

export async function getMangaInfo(id: number) {
  const res = await wangaDBApi.get<MangaInfoResponse>(`/manga/${id}`);

  return res.data;
}

export async function getChapters(id: number, page: number = 1) {
  const res = await wangaDBApi.get<ChapterBody>(`/chapters/${id}/${page}`);

  return res.data;
}

export async function getPages(id: number) {
  const res = await wangaDBApi.get<Page>(`/pages/${id}`);

  return res.data;
}

export async function createUser(user: SignupUser) {
  const { confirmPassword, ...rest } = user;

  const res = await wangaDBApi.post<User>("/auth/signup", {
    ...rest,
  });

  return res.data;
}

export async function signinApi(user: SigninUser) {
  const res = await wangaDBApi.post<User>("/auth/signin", {
    ...user,
  });

  return res.data;
}

export async function signinGoogleApi(user: SigninGoogleInput) {
  const res = await wangaDBApi.post<User>("/auth/google/signin", {
    ...user,
  });

  return res.data;
}

export async function newFavorite(id_serie: number) {
  const res = await wangaDBApi.post("/favorites/new", {
    id_serie,
  });

  return res.data;
}

export async function getFavorites() {
  const res = await wangaDBApi.get<FavoriteBody>("/favorites");

  return res.data;
}

export async function delFavorite(del_list: string[]) {
  const res = await wangaDBApi.post("/favorites/del", {
    del_list,
  });

  return res.data;
}
