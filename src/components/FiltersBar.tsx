import React from 'react'
import { useFilters } from '../contexts/useFilters'
import type { Status } from '../types/api'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const FiltersBar: React.FC = () => {
  const { name, status, species, setName, setStatus, setSpecies, setPage, reset } = useFilters()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setPage(1)
  }

  const onChangeStatus = (value: string) => {
    setStatus(value === 'all' ? undefined : (value as Status))
    setPage(1)
  }

  const onChangeSpecies = (value: string) => {
    setSpecies(value === 'all' ? undefined : value)
    setPage(1)
  }

  return (
    <section
      aria-label="Filtros"
      className="space-y-4 rounded-lg border bg-card p-4 shadow-sm"
    >
      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-name">Nombre</Label>
          <Input
            id="filter-name"
            placeholder="Buscar por nombre"
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Estado</Label>
          <Select value={status ?? 'all'} onValueChange={onChangeStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Alive">Vivo</SelectItem>
              <SelectItem value="Dead">Muerto</SelectItem>
              <SelectItem value="unknown">Desconocido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Especie</Label>
          <Select value={species ?? 'all'} onValueChange={onChangeSpecies}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una especie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Human">Humano</SelectItem>
              <SelectItem value="Alien">Alien</SelectItem>
              <SelectItem value="Robot">Robot</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={reset}>
          Limpiar filtros
        </Button>
      </div>
    </section>
  )
}

export default FiltersBar
