import React from 'react'

interface PaginationProps {
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  page: number
}

const Pagination: React.FC<PaginationProps> = ({ canPrev, canNext, onPrev, onNext, page }) => {
  return (
    <nav aria-label="Paginación" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBlock: 12 }}>
      <button type="button" onClick={onPrev} disabled={!canPrev}>
        Anterior
      </button>
      <span>Página {page}</span>
      <button type="button" onClick={onNext} disabled={!canNext}>
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination

