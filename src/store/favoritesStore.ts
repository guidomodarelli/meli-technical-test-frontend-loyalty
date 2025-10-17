import { create } from 'zustand'
import type { CharacterAPI } from "../types/api"
import { FAVORITE_KEY_LOCAL_STORAGE } from "../constants"

interface FavoritesStore {
  favorites: CharacterAPI[]
  addFavorite: (character: CharacterAPI) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (character: CharacterAPI) => void
}

export const useFavorites = create<FavoritesStore>((set) => {

  const addFavorite = (state) => {

    const toSave = { favorites: [...state.favorites, character] }

    localStorage.setItem(FAVORITE_KEY_LOCAL_STORAGE, JSON.stringify(toSave.favorites))

    return toSave
  }

  const removeFavorite = (state) => {

    const toSave = { favorites: state.favorites.filter((fav) => fav.id !== id) }

    localStorage.setItem(FAVORITE_KEY_LOCAL_STORAGE, JSON.stringify(toSave.favorites))

    return toSave
  }

  return {
    favorites: [] as CharacterAPI[],
    addFavorite: (character: CharacterAPI) => set(addFavorite(character)),
    removeFavorite: (id: number) => set(removeFavorite(id)),
    toggleFavorite: (character: CharacterAPI) => set((state) => {
      const isFavorite = state.favorites.some((fav) => fav.id === character.id)
      if (isFavorite) {
        return addFavorite(character)
      } else {
        return removeFavorite(character.id)
      }
    }),
  }
})