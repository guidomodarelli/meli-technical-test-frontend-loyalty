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

  if (loading) {
    return <p className="text-center text-sm text-muted-foreground">Cargando personajes...</p>
  }

  if (err) {
    return (
      <p className="text-center text-sm text-destructive">
        Error: {err.message}
      </p>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Personajes</h1>
        <p className="text-sm text-muted-foreground">
          Explora la lista de personajes y marca tus favoritos.
        </p>
      </div>

      <FiltersBar />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list?.length ? (
          list.map((character) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              image={character.image}
              state={character.status}
              specie={character.species}
              isFavorite={favorites.includes(character.id)}
              toggleFavorite={() => toggleFavorite(character.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No se encontraron personajes con los filtros actuales.
          </p>
        )}
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
