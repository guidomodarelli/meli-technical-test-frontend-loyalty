import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  page: number
}

const Pagination: React.FC<PaginationProps> = ({ canPrev, canNext, onPrev, onNext, page }) => {
  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-between gap-3 pt-4"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <p className="text-sm text-muted-foreground">Página {page}</p>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

export default Pagination
