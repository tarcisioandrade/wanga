import { MostRead } from "../@types/mostRead";
import { MostReadPeriod } from "../@types/mostReadPeriod";
import { Release } from "../@types/release";
import { mangaDBApi } from "./instances";

import fakeDataRelease from "fakeData/saiu_hoje.json";
import fakeDataMostReadPeriod from "fakeData/most_read_period.json";
import fakeDataMostRead from "fakeData/most_read.json";
import fakeDataSearch from "fakeData/search.json";
import fakeDataFeatured from "fakeData/featured.json";
import fakeCategoryList from "fakeData/categories_list.json";
import fakeCategorySeries from "fakeData/categories_series_list.json";

import { Search } from "../@types/search";
import { Featured } from "src/@types/featured";
import { CategoryBody } from "src/@types/category";
import { CategorySeriesBody } from "src/@types/categorySerie";

const release = fakeDataRelease as Release;
const most_read_period = fakeDataMostReadPeriod as MostReadPeriod;
const most_read = fakeDataMostRead as MostRead;
const search_data = fakeDataSearch as Search;
const featured_data = fakeDataFeatured as Featured;
const categories_list_data = fakeCategoryList as CategoryBody;
// @ts-ignore
const categories_series_data = fakeCategorySeries as CategorySeriesBody;

export function delay<T>(t: number, v: T): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

const DEV_MODE = true;

export async function getReleases(page: number = 1, type?: string) {
  if (DEV_MODE) {
    return delay<Release>(2000, release);
  }

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
  if (DEV_MODE) {
    return delay<MostReadPeriod>(2000, most_read_period);
  }

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
  if (DEV_MODE) {
    return delay<MostRead>(2000, most_read);
  }

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
  // return delay<Search>(2000, search_data);

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
  if (DEV_MODE) {
    return delay<Featured>(2000, featured_data);
  }

  const res = await mangaDBApi.get<Featured>("/home/getFeaturedSeries.json");

  return res.data;
}

export async function getCategoriesList() {
  if (DEV_MODE) {
    return delay<CategoryBody>(2000, categories_list_data);
  }

  const res = await mangaDBApi.get<CategoryBody>(
    "/categories/categories_list.json"
  );

  return res.data;
}

export async function getCategoriesSeries(id_category: number, page: number) {
  if (DEV_MODE) {
    return delay<CategorySeriesBody>(2000, {
      series: categories_series_data.series,
      nextPage: page + 1,
    });
  }

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
