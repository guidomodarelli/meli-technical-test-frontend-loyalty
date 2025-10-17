import React, { useState } from "react"
import { FavoriteContext } from "../contexts/useFavorites"
import useCharacters from "../hooks/useCharacters"
import CharacterCard from "./CharacterCard"
import type { Status } from "../types/api"

interface CharacterListProps {
  onlyFavs?: boolean
}

const CharacterList = ({ onlyFavs }: CharacterListProps) => {
  const [filterByName, setFilterByName] = useState("")
  const [filterByStatus, setFilterByStatus] = useState<Status | undefined>(undefined)
  const [filterBySpecie, setFilterBySpecie] = useState<string | undefined>(undefined)
  const { characters, isLoading, error } = useCharacters({ page: 1, name: !onlyFavs ? filterByName : undefined, status: !onlyFavs ? filterByStatus : undefined, specie: !onlyFavs ? filterBySpecie : undefined })
  const { toggleFavorite, favorites } = React.useContext(FavoriteContext)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
    {onlyFavs ? <h1>Favorite Characters</h1> : <h1>All Characters</h1>}
    {!onlyFavs && (
      <>
      <form onSubmit={handleSubmit}>
      <input value={filterByName} onChange={e => setFilterByName(e.target.value)} />
      <select value={filterByStatus} onChange={e => setFilterByStatus(e.target.value as Status)}>
        <option value="">Select status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={filterBySpecie} onChange={e => setFilterBySpecie(e.target.value)}>
        <option value="">Select species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
      </select>
    </form>
    <button onClick={() => setFilterByName("")}>Clear Filter</button>
    </>
    )}
    {characters ? (onlyFavs ? characters.filter(character => favorites.includes(character.id)).map(character => (
        <CharacterCard key={character.id} name={character.name} image={character.image} state={character.status} specie={character.species} isFavorite={favorites.includes(character.id)} toggleFavorite={() => toggleFavorite(character)} />
      )) : characters.map(character => (
        <CharacterCard key={character.id} name={character.name} image={character.image} state={character.status} specie={character.species} isFavorite={favorites.includes(character.id)} toggleFavorite={() => toggleFavorite(character)} />
      ))) : null}
    </>
  )
}

export default CharacterList