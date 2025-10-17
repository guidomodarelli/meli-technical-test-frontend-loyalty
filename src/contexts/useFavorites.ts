import React from "react";
import type { CharacterAPI } from "../types/api";
import { FAVORITE_KEY_LOCAL_STORAGE } from "../constants";

const FavoriteContext = React.createContext<{
  favorites: CharacterAPI["id"][];
  addFavorite: (id: CharacterAPI["id"]) => void;
  removeFavorite: (id: CharacterAPI["id"]) => void;
  toggleFavorite: (character: CharacterAPI) => void;
} | undefined>(undefined);

const createContext = () => {
    const context = React.useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
}

const useFavorites = () => {
  const [favorites, setFavorites] = React.useState<CharacterAPI["id"][]>(localStorage.getItem(FAVORITE_KEY_LOCAL_STORAGE) ? JSON.parse(localStorage.getItem(FAVORITE_KEY_LOCAL_STORAGE) as string) : []);

  const addFavorite = (id: CharacterAPI["id"]) => {
    setFavorites((prev) => [...prev, id]);

    localStorage.setItem(FAVORITE_KEY_LOCAL_STORAGE, JSON.stringify([...favorites, id]));
  };

  const removeFavorite = (id: CharacterAPI["id"]) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));

    localStorage.setItem(FAVORITE_KEY_LOCAL_STORAGE, JSON.stringify(favorites.filter((favId) => favId !== id)));
  };

  const toggleFavorite = (character: CharacterAPI) => {
    if (favorites.includes(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character.id);
    }
  }

  return { favorites, addFavorite, removeFavorite, toggleFavorite };
};

export { FavoriteContext, useFavorites };