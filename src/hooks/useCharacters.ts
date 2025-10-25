import React, { useState } from 'react'
import type { APIInfo, CharacterAPI, Status } from "../types/api"
import { debounce } from "../utils"

interface UseCharactersProps {
  page?: number
  name?: string
  status?: Status
  species?: string
}

const useCharacters = ({ page = 1, name, status, species }: UseCharactersProps) => {
  const [characters, setCharacters] = React.useState<CharacterAPI[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  React.useEffect(() => {
    const fetchCharacters = debounce(async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}${name ? `&name=${name}` : ''}${status ? `&status=${status}` : ''}${species ? `&species=${species}` : ''}`)
        const data = (await response.json()) as APIInfo
        setHasNext(!!data.info.next)
        setHasPrev(!!data.info.prev)
        setCharacters(data.results)
      } catch (error: Error | any) {
        const _error = error as Error
        console.error('Error fetching characters:', _error)
        setError(_error)
      } finally {
        setIsLoading(false)
      }
    }, 500)

    fetchCharacters()
  }, [page, name, status, species])

  return { characters, error, isLoading, hasNext, hasPrev }
}

export default useCharacters
