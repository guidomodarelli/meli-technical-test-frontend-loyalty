import React from "react";
import type { CharacterAPI } from "../types/api";
import { FAVORITE_KEY_LOCAL_STORAGE } from "../constants";

type FavoritesContextValue = {
  favorites: CharacterAPI["id"][];
  addFavorite: (id: CharacterAPI["id"]) => void;
  removeFavorite: (id: CharacterAPI["id"]) => void;
  toggleFavorite: (id: CharacterAPI["id"]) => void;
};

const FavoritesContext = React.createContext<FavoritesContextValue | undefined>(
  undefined,
);

const readInitialFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(FAVORITE_KEY_LOCAL_STORAGE);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = React.useState<number[]>(
    readInitialFavorites(),
  );

  React.useEffect(() => {
    localStorage.setItem(
      FAVORITE_KEY_LOCAL_STORAGE,
      JSON.stringify(favorites),
    );
  }, [favorites]);

  const addFavoriteAction = (id: number) => (previous: number[]) => {
    if (!previous.includes(id)) {
      return [...previous, id];
    }
    return previous;
  }

  const removeFavoriteAction = (id: number) => (previous: number[]) => {
    return previous.filter((favId) => favId !== id);
  };

  const addFavorite = (id: number) =>
    setFavorites(addFavoriteAction(id));

  const removeFavorite = (id: number) =>
    setFavorites(removeFavoriteAction(id));

  const toggleFavorite = (id: number) =>
    setFavorites((previous) =>
      previous.includes(id) ? removeFavoriteAction(id)(previous) : addFavoriteAction(id)(previous),
    );

  const value: FavoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = React.useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

