import { useFilters } from '../contexts/useFilters'

export interface UsePaginationOptions {
  min?: number
  max?: number
  canNext?: boolean
  canPrev?: boolean
}

export const usePagination = ({
  min = 1,
  max,
  canNext,
  canPrev,
}: UsePaginationOptions) => {
  const { page, setPage } = useFilters()

  const computedCanPrev = canPrev ?? page > min
  const computedCanNext = canNext ?? (max !== undefined ? page < max : true)

  const goTo = (n: number) => {
    const next = Math.max(min, max !== undefined ? Math.min(max, n) : n)
    if (next !== page) setPage(next)
  }

  const next = () => {
    if (!computedCanNext) return
    goTo(page + 1)
  }

  const prev = () => {
    if (!computedCanPrev) return
    goTo(page - 1)
  }

  const reset = () => setPage(min)

  return {
    page,
    canNext: computedCanNext,
    canPrev: computedCanPrev,
    next,
    prev,
    goTo,
    reset,
    setPage: goTo,
  }
}

export default usePagination
