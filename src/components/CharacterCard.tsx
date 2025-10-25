import React from 'react'
import type { Status } from "../types/api"

interface CharacterCardProps {
  name: string
  isFavorite?: boolean
  image: string
  state: Status
  specie: string
  toggleFavorite?: () => void
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, image, state, specie, isFavorite, toggleFavorite }) => {
  return (
    <article className={"CharacterCard"}>
      <header className={"CharacterCard__header"}>
        <h2>{name}</h2>
      </header>
      <section className={"CharacterCard__body"}>
        <img src={image} alt={name} />
        <p>Estado: {state}</p>
        <p>Especie: {specie}</p>
      </section>
      <footer className={"CharacterCard__footer"}>
        <button onClick={toggleFavorite}>{isFavorite ? "Quitar" : "Favorito"}</button>
      </footer>
    </article>
  )
}

export default CharacterCard
