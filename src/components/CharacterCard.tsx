import React from 'react'
import { Heart } from 'lucide-react'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import type { Status } from "../types/api"

interface CharacterCardProps {
  name: string
  isFavorite?: boolean
  image: string
  state: Status
  specie: string
  toggleFavorite?: () => void
}

const statusVariantMap: Record<Status, 'default' | 'destructive' | 'secondary'> = {
  Alive: 'default',
  Dead: 'destructive',
  unknown: 'secondary',
}

const statusLabelMap: Record<Status, string> = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, image, state, specie, isFavorite, toggleFavorite }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-start justify-between space-y-0">
        <div className={"text-start"}>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription>{specie}</CardDescription>
        </div>
        <Badge variant={statusVariantMap[state]}>{statusLabelMap[state]}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-md border">
          <img src={image} alt={name} className="h-64 w-full object-cover" loading="lazy" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          onClick={toggleFavorite}
          variant={isFavorite ? 'secondary' : 'default'}
          className="gap-2"
        >
          <Heart
            className="h-4 w-4"
            fill={isFavorite ? 'currentColor' : 'none'}
          />
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CharacterCard
