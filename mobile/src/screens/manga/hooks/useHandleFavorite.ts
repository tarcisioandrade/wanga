import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Favorite } from "src/@types/favorite";
import { getFavorites, newFavorite, delFavorite } from "src/api/wangaServices";
import { queryKeys } from "src/constants/queryKeys";
import { useUser } from "src/contexts/UserContext";

export const useHandleFavorite = (id_serie: string | undefined) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isFavorited, setIsFavorited] = useState<boolean | null>(null);
  const { user } = useUser();

  const { data, refetch } = useQuery({
    queryKey: [queryKeys.favorites],
    queryFn: getFavorites,
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setFavorites(data.favorites);
      const favorited = data.favorites.some(
        (item) => String(item.id_serie) === id_serie
      );
      setIsFavorited(favorited);
    }
  }, [data]);

  const { mutate: newFavoriteMutate } = useMutation({
    mutationFn: (id_serie: number) => newFavorite(id_serie),
    onSuccess: () => {
      Toast.show({
        text1: "Adicionado aos seus favoritos",
        topOffset: 80,
      });
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutateAsync: delFavoriteMutate } = useMutation({
    mutationFn: (del: string[]) => delFavorite(del),
    onSuccess: () => {
      Toast.show({
        text1: "Removido dos seus favoritos",
        topOffset: 80,
      });
      refetch();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const currentFavorite = favorites.find((fav) => {
    if (id_serie) return String(fav.id_serie) === id_serie;
  });

  const favoriteManga = () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Permissão Negada",
        text2: "Só usuários autenticados podem usar este recurso.",
        topOffset: 80,
      });
      return;
    }
    if (id_serie) {
      setIsFavorited(true);
      newFavoriteMutate(Number(id_serie));
    }
  };

  const unfavoriteManga = async () => {
    const oldFavorites = favorites;
    if (currentFavorite) {
      try {
        setIsFavorited(false);
        const newFavorites = favorites.filter(
          (fav) => String(fav.id) != currentFavorite.id
        );
        setFavorites(newFavorites);
        await delFavoriteMutate([currentFavorite.id]);
      } catch (error) {
        setIsFavorited(true);
        setFavorites(oldFavorites);
      }
    }
  };

  return { isFavorited, unfavoriteManga, favoriteManga };
};
