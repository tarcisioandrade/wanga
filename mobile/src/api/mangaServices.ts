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

function dispatchError<T>(data: T, url: string | undefined) {
  if (!Array.isArray(data))
    throw new Error(
      `The type of response is different from what you expect ${url}`
    );
}

export async function getReleases(page: number = 1, type?: string) {
  const { data, config } = await mangaDBApi.get<Release>("/home/releases", {
    params: {
      page,
      type,
    },
  });

  dispatchError<Release>(data, config.url);

  return data;
}

export async function getMostReadPeriod(
  page: number = 1,
  period: string,
  type?: string
) {
  const { data, config } = await mangaDBApi.get<MostReadPeriod>(
    "/home/most_read_period",
    {
      params: {
        page,
        type,
        period,
      },
    }
  );

  dispatchError<MostReadPeriod>(data, config.url);

  return data;
}

export async function getMostRead(page: number = 1, type?: string) {
  const { data, config } = await mangaDBApi.get<MostRead>("/home/most_read", {
    params: {
      page,
      type,
    },
  });

  dispatchError<MostRead>(data, config.url);

  return data;
}

export async function getSearch(searchValue: string) {
  const search = searchValue;

  const { data, config } = await mangaDBApi.post<Search>(
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

  dispatchError<Search>(data, config.url);

  return data;
}

export async function getFeatured() {
  const { data, config } = await mangaDBApi.get<Featured>(
    "/home/getFeaturedSeries.json"
  );

  dispatchError<Featured>(data, config.url);

  return data;
}

export async function getCategoriesList() {
  const { data, config } = await mangaDBApi.get<CategoryBody>(
    "/categories/categories_list.json"
  );

  dispatchError<CategoryBody>(data, config.url);

  return data;
}

export async function getCategoriesSeries(id_category: number, page: number) {
  const { data, config } = await mangaDBApi.get<CategorySeriesBody>(
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

  dispatchError<CategorySeriesBody>(data, config.url);

  return {
    series: data.series,
    nextPage: page + 1,
  };
}
