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
    <div className={"CharacterCard"}>
      <div className={"CharacterCard__header"}>
        <h2>{name}</h2>
      </div>
      <div className={"CharacterCard__body"}>
        <img src={image} alt={name} />
        <p>Status: {state}</p>
        <p>Specie: {specie}</p>
      </div>
      <div className={"CharacterCard__footer"}>
        <button onClick={toggleFavorite}>{isFavorite ? "Unfavorite" : "Favorite"}</button>
      </div>
    </div>
  )
}

export default CharacterCard