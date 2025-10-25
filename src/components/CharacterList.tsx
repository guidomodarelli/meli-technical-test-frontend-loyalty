// No default React import needed with modern JSX transform
import { useFavorites } from "../contexts/useFavorites"
import { useFilters } from "../contexts/useFilters"
import useCharacters from "../hooks/useCharacters"
import usePagination from "../hooks/usePagination"
import CharacterCard from "./CharacterCard"
import FiltersBar from "./FiltersBar"
import Pagination from "./Pagination"

const CharacterList = () => {
  const { favorites, toggleFavorite } = useFavorites()
  const filters = useFilters()

  const { characters, isLoading, error, hasNext, hasPrev } =
    useCharacters({
      page: filters.page,
      name: filters.name,
      status: filters.status,
      species: filters.species,
    })
  const list = characters
  const loading = isLoading
  const err = error

  const pagination = usePagination({
    canNext: hasNext,
    canPrev: hasPrev,
    min: 1,
  })

  if (loading) return <p>Cargando...</p>
  if (err) return <p>Error: {err.message}</p>

  return (
    <section>
      <h1>Personajes</h1>

      <FiltersBar />

      <section style={{ display: 'grid', gap: 12 }}>
        {list?.map((character) => (
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

      <Pagination
        canPrev={pagination.canPrev}
        canNext={pagination.canNext}
        onPrev={pagination.prev}
        onNext={pagination.next}
        page={pagination.page}
      />
    </section>
  )
}

export default CharacterList
