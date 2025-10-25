import React from 'react'
import { useFilters } from '../contexts/useFilters'
import type { Status } from '../types/api'

const FiltersBar: React.FC = () => {
  const { name, status, species, setName, setStatus, setSpecies, setPage, reset } = useFilters()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setPage(1)
  }

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status | ''
    setStatus(value ? (value as Status) : undefined)
    setPage(1)
  }

  const onChangeSpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSpecies(value ? value : undefined)
    setPage(1)
  }

  return (
    <section aria-label="Filtros" style={{ display: 'grid', gap: 8, marginBlock: 12 }}>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          aria-label="Buscar por nombre"
          placeholder="Buscar por nombre"
          value={name}
          onChange={onChangeName}
        />
        <select aria-label="Estado" value={status ?? ''} onChange={onChangeStatus}>
          <option value="">Estado</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select aria-label="Especie" value={species ?? ''} onChange={onChangeSpecies}>
          <option value="">Especie</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>
      </form>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={reset}>Limpiar filtros</button>
      </div>
    </section>
  )
}

export default FiltersBar

