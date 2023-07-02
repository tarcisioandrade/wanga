import { MostRead } from "../@types/mostRead";
import { MostReadPeriod } from "../@types/mostReadPeriod";
import { Release } from "../@types/release";
import { mangaDBApi } from "./instances";

import fakeDataRelease from "fakeData/saiu_hoje.json";
import fakeDataMostReadPeriod from "fakeData/most_read_period.json";
import fakeDataMostRead from "fakeData/most_read.json";
import fakeDataSearch from "fakeData/search.json";
import fakeDataFeatured from "fakeData/featured.json";

import { Search } from "../@types/search";
import { Featured } from "src/@types/featured";

const release = fakeDataRelease as Release;
const most_read_period = fakeDataMostReadPeriod as MostReadPeriod;
const most_read = fakeDataMostRead as MostRead;
const search_data = fakeDataSearch as Search;
const featured_data = fakeDataFeatured as Featured;

export function delay<T>(t: number, v: T): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

export async function getReleases(page: number = 1, type?: string) {
  return delay<Release>(2000, release);

  const { data } = await mangaDBApi.get<Release>("/home/releases", {
    params: {
      page,
      type,
    },
  });

  return data;
}

export async function getMostReadPeriod(page: number = 1, type?: string) {
  return delay<MostReadPeriod>(2000, most_read_period);

  const { data } = await mangaDBApi.get<MostReadPeriod>(
    "/home/most_read_period",
    {
      params: {
        page,
        type,
      },
    }
  );

  return data;
}

export async function getMostRead(page: number = 1, type?: string) {
  return delay<MostRead>(2000, most_read);

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
  // return delay<Search>(2000, search_data)

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
  return delay<Featured>(2000, featured_data);

  const res = await mangaDBApi.get<Featured>("/home/getFeaturedSeries.json");

  return res.data;
}
