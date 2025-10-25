// Favorites-only list view
import { useFavorites } from "../contexts/useFavorites"
import useFavoriteCharacters from "../hooks/useFavoriteCharacters"
import CharacterCard from "./CharacterCard"

const FavoritesCharacterList = () => {
  const { favorites, toggleFavorite } = useFavorites()
  const { characters, isLoading, error } = useFavoriteCharacters(favorites)

  if (favorites.length === 0) return <p>No tienes personajes favoritos aún.</p>
  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      <h1>Favoritos</h1>
      <section style={{ display: 'grid', gap: 12 }}>
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

