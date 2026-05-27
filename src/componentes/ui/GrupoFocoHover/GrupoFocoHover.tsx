import { createContext, useContext, useState, type ReactNode } from 'react'

interface HoverFocusContextValue {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const HoverFocusContext = createContext<HoverFocusContextValue>({
  activeId: null,
  setActiveId: () => {},
})

export function GrupoFocoHover({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <HoverFocusContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </HoverFocusContext.Provider>
  )
}

export function useFocoHover() {
  return useContext(HoverFocusContext)
}
