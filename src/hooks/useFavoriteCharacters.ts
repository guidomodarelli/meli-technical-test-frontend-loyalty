import React from 'react'
import type { CharacterAPI } from '../types/api'

const buildUrl = (ids: number[]) =>
  `https://rickandmortyapi.com/api/character/${ids.join(',')}`

// Fetch favorite characters by multiple ids. Handles 0, 1, and many.
export const useFavoriteCharacters = (ids: number[]) => {
  const [characters, setCharacters] = React.useState<CharacterAPI[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!ids || ids.length === 0) {
      setCharacters([])
      return
    }

    let cancelled = false
    const fetchFavs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch(buildUrl(ids))
        if (!res.ok) throw new Error('Failed to load favorites')
        const data = await res.json()
        const arr: CharacterAPI[] = Array.isArray(data) ? data : [data]
        if (!cancelled) setCharacters(arr)
      } catch (e: any) {
        if (!cancelled) setError(e as Error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchFavs()
    return () => {
      cancelled = true
    }
  }, [ids.join(',')])

  return { characters, isLoading, error }
}

export default useFavoriteCharacters

