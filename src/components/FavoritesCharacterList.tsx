// Favorites-only list view
import { NavLink } from "react-router-dom"

import { useFavorites } from "../contexts/useFavorites"
import useFavoriteCharacters from "../hooks/useFavoriteCharacters"
import CharacterCard from "./CharacterCard"
import { Button } from "./ui/button"

const FavoritesCharacterList = () => {
  const { favorites, toggleFavorite } = useFavorites()
  const { characters, isLoading, error } = useFavoriteCharacters(favorites)

  if (favorites.length === 0) {
    return (
      <section className="space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Favoritos</h1>
          <p className="text-sm text-muted-foreground">
            No tienes personajes favoritos aún.
          </p>
        </div>
        <Button asChild>
          <NavLink to="/">Explorar personajes</NavLink>
        </Button>
      </section>
    )
  }

  if (isLoading) {
    return <p className="text-center text-sm text-muted-foreground">Cargando favoritos...</p>
  }

  if (error) {
    return <p className="text-center text-sm text-destructive">Error: {error.message}</p>
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Favoritos</h1>
        <p className="text-sm text-muted-foreground">
          Esta es tu colección personal de personajes.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            image={character.image}
            state={character.status}
            specie={character.species}
            isFavorite={favorites.includes(character.id)}
            toggleFavorite={() => toggleFavorite(character.id)}
          />
        ))}
      </section>
    </section>
  )
}

export default FavoritesCharacterList
