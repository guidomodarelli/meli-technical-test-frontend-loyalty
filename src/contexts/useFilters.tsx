import React from 'react'
import type { Status } from '../types/api'

type FiltersContextValue = {
  page: number
  name: string
  status?: Status
  species?: string
  setPage: (page: number) => void
  setName: (name: string) => void
  setStatus: (status?: Status) => void
  setSpecies: (species?: string) => void
  reset: () => void
}

const FiltersContext = React.createContext<FiltersContextValue | undefined>(
  undefined,
)

export const FiltersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [page, setPage] = React.useState(1)
  const [name, setName] = React.useState('')
  const [status, setStatus] = React.useState<Status | undefined>(undefined)
  const [species, setSpecies] = React.useState<string | undefined>(undefined)

  const reset = () => {
    setName('')
    setStatus(undefined)
    setSpecies(undefined)
    setPage(1)
  }

  const value: FiltersContextValue = {
    page,
    name,
    status,
    species,
    setPage,
    setName,
    setStatus,
    setSpecies,
    reset,
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const ctx = React.useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider')
  return ctx
}

