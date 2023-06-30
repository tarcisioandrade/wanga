import { MostRead } from "../@types/mostRead";
import { MostReadPeriod } from "../@types/mostReadPeriod";
import { Release } from "../@types/release";
import { mangaDBApi } from "./instances";

import fakeDataRelease from "../../fakeData/saiu_hoje.json";
import fakeDataMostReadPeriod from "../../fakeData/most_read_period.json";
import fakeDataMostRead from "../../fakeData/most_read.json";

const release = fakeDataRelease as Release;
const most_read_period = fakeDataMostReadPeriod as MostReadPeriod;
const most_read = fakeDataMostRead as MostRead;

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

  return delay<Release>(2000, release);
  return data;
}

export async function getMostReadPeriod(page: number = 1, type?: string) {
  const { data } = await mangaDBApi.get<MostReadPeriod>(
    "/home/most_read_period",
    {
      params: {
        page,
        type,
      },
    }
  );

  return delay<MostReadPeriod>(2000, most_read_period);
  return data;
}

export async function getMostRead(page: number = 1, type?: string) {
  const { data } = await mangaDBApi.get<MostRead>("/home/most_read", {
    params: {
      page,
      type,
    },
  });
  return delay<MostRead>(2000, most_read);

  return data;
}
