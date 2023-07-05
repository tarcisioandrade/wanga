import { useQueries } from "@tanstack/react-query";
import {
  getReleases,
  getMostReadPeriod,
  getMostRead,
  getFeatured,
} from "src/api/mangaServices";
import { queryKeys } from "src/constants/queryKeys";

export const useMangaQueries = (type: string, period: string = "week") => {
  const [releasesResult, mostReadPeriodResult, mostReadResult, featuredResult] =
    useQueries({
      queries: [
        {
          queryKey: [queryKeys.releases, type],
          queryFn: () => getReleases(1, type),
        },
        {
          queryKey: [queryKeys.mostReadPeriod, type, period],
          queryFn: () => getMostReadPeriod(1, period, type),
        },
        {
          queryKey: [queryKeys.mostRead, type],
          queryFn: () => getMostRead(1, type),
        },
        {
          queryKey: [queryKeys.featured],
          queryFn: getFeatured,
        },
      ],
    });

  return {
    releasesResult,
    mostReadPeriodResult,
    mostReadResult,
    featuredResult,
  };
};
