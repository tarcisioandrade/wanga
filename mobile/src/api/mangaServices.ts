import { MostRead } from "src/@types/mostRead";
import { MostReadPeriod } from "src/@types/mostReadPeriod";
import { Release } from "src/@types/release";
import { mangaDBApi } from "./instances";

import { Search } from "src/@types/search";
import { Featured } from "src/@types/featured";
import { CategoryBody } from "src/@types/category";
import { CategorySeriesBody } from "src/@types/categorySerie";

export function delay<T>(t: number, v: T): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

export async function getReleases(page: number = 1, type?: string) {
  const { data } = await mangaDBApi.get<Release>("/home/releases", {
    params: {
      page,
      type,
    },
  });

  return data;
}

export async function getMostReadPeriod(
  page: number = 1,
  period: string,
  type?: string
) {
  const { data } = await mangaDBApi.get<MostReadPeriod>(
    "/home/most_read_period",
    {
      params: {
        page,
        type,
        period,
      },
    }
  );

  return data;
}

export async function getMostRead(page: number = 1, type?: string) {
  const { data } = await mangaDBApi.get<MostRead>("/home/most_read", {
    params: {
      page,
      type,
    },
  });

  return data;
}

export async function getSearch(searchValue: string) {
  const search = searchValue;

  const res = await mangaDBApi.post<Search>(
    "/lib/search/series.json",
    {
      search,
    },
    {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data;
}

export async function getFeatured() {
  const res = await mangaDBApi.get<Featured>("/home/getFeaturedSeries.json");

  return res.data;
}

export async function getCategoriesList() {
  const res = await mangaDBApi.get<CategoryBody>(
    "/categories/categories_list.json"
  );

  return res.data;
}

export async function getCategoriesSeries(id_category: number, page: number) {
  const res = await mangaDBApi.get<CategorySeriesBody>(
    `/categories/series_list.json?page=${page}`,
    {
      params: {
        id_category,
      },
      headers: {
        "x-requested-with": "XMLHttpRequest",
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    series: res.data.series,
    nextPage: page + 1,
  };
}
