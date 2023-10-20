import React, { useState } from "react";
import { Container, Layout, ScrollContainer } from "src/components/Layout";
import Header from "src/components/Header";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "src/hooks/useDebounce";
import { queryKeys } from "src/constants/queryKeys";
import { getSearch } from "src/api/mangaServices";
import CardSerie from "../../components/CardSerie";
import SearchSkeleton from "./components/SearchSkeleton";
import { Text } from "src/components/Text";
import RefreshInError from "src/components/RefreshInError";
import { vs } from "src/utils/metrics";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchDebounced = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [queryKeys.search, searchDebounced],
    queryFn: () => getSearch(searchDebounced),
    enabled: !!searchDebounced,
  });
  const loading = isFetching && isLoading;

  const handleSearch = (search: string) => {
    setSearchValue(search);
  };

  return (
    <Layout>
      <Header
        backShow
        inputShow
        onChangeValue={handleSearch}
        value={searchValue}
      />
      <ScrollContainer>
        <Container>
          {loading ? <SearchSkeleton /> : null}
          {isError && <RefreshInError refresh={refetch} height={vs(219)} />}
          {!loading && data?.series === false ? (
            <Text>Nenhum resultado encontrado.</Text>
          ) : null}
          {data && typeof data.series !== "boolean" ? (
            <>
              {data?.series.map((serie) => (
                <CardSerie serie={serie} key={serie.id_serie} />
              ))}
            </>
          ) : null}
        </Container>
      </ScrollContainer>
    </Layout>
  );
};

export default Search;
