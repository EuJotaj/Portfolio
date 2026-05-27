import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { ModalCurriculo } from '@/modais/ModalCurriculo/ModalCurriculo'
import { bloquearScrollCorpo, desbloquearScrollCorpo } from '@/biblioteca/bloqueioScrollCorpo'

interface ContextoModalCurriculo {
  abrirCurriculo: () => void
  fecharCurriculo: () => void
  estaAberto: boolean
}

const ContextoModalCurriculo = createContext<ContextoModalCurriculo | null>(null)

export function ProvedorModalCurriculo({ children }: { children: ReactNode }) {
  const [estaAberto, setEstaAberto] = useState(false)

  const abrirCurriculo = useCallback(() => {
    setEstaAberto(true)
    bloquearScrollCorpo()
  }, [])

  const fecharCurriculo = useCallback(() => {
    setEstaAberto(false)
    desbloquearScrollCorpo()
  }, [])

  return (
    <ContextoModalCurriculo.Provider value={{ abrirCurriculo, fecharCurriculo, estaAberto }}>
      {children}
      <ModalCurriculo />
    </ContextoModalCurriculo.Provider>
  )
}

export function useModalCurriculo() {
  const ctx = useContext(ContextoModalCurriculo)
  if (!ctx) throw new Error('useModalCurriculo deve ser usado dentro de ProvedorModalCurriculo')
  return ctx
}
