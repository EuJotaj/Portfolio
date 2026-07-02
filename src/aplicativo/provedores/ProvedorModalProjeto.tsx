import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ModalProjeto } from '@/modais/ModalProjeto/ModalProjeto';
import { bloquearScrollCorpo, desbloquearScrollCorpo } from '@/biblioteca/bloqueioScrollCorpo';

interface ContextoModalProjeto {
  abrirProjeto: (id: string) => void;
  fecharProjeto: () => void;
  idProjetoAtivo: string | null;
}

const ContextoModalProjeto = createContext<ContextoModalProjeto | null>(null);

export function ProvedorModalProjeto({ children }: { children: ReactNode }) {
  const [idProjetoAtivo, setIdProjetoAtivo] = useState<string | null>(null);

  const abrirProjeto = useCallback((id: string) => {
    setIdProjetoAtivo(id);
    bloquearScrollCorpo();
  }, []);

  const fecharProjeto = useCallback(() => {
    setIdProjetoAtivo(null);
    desbloquearScrollCorpo();
  }, []);

  return (
    <ContextoModalProjeto.Provider value={{ abrirProjeto, fecharProjeto, idProjetoAtivo }}>
      {children}
      <ModalProjeto />
    </ContextoModalProjeto.Provider>
  );
}

export function useModalProjeto() {
  const ctx = useContext(ContextoModalProjeto);
  if (!ctx) throw new Error('useModalProjeto deve ser usado dentro de ProvedorModalProjeto');
  return ctx;
}
