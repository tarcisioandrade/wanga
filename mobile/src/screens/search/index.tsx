import React, { useState } from "react";
import { Container, Layout, ScrollContainer } from "src/components/Layout";
import Header from "src/components/Header";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "src/hooks/useDebounce";
import { queryKeys } from "src/constants/queryKeys";
import { getSearch } from "src/api/mangaServices";
import { SearchCardsContainer } from "./styled";
import SearchCard from "./components/SearchCard";
import SearchSkeleton from "./components/SearchSkeleton";
import { Text } from "src/components/Text";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchDebounced = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching } = useQuery({
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
      <Header inputShow onChangeValue={handleSearch} value={searchValue} />
      <ScrollContainer>
        <Container>
          {loading ? <SearchSkeleton /> : null}
          {!loading && data?.series === false ? (
            <Text>Nenhum resultado encontrado.</Text>
          ) : null}
          {data && typeof data.series !== "boolean" ? (
            <SearchCardsContainer>
              {data?.series.map((serie) => (
                <SearchCard mangaSearch={serie} key={serie.id_serie} />
              ))}
            </SearchCardsContainer>
          ) : null}
        </Container>
      </ScrollContainer>
    </Layout>
  );
};

export default Search;
