let contadorBloqueio = 0;

export function bloquearScrollCorpo() {
  if (contadorBloqueio === 0) {
    document.body.style.overflow = 'hidden';
  }
  contadorBloqueio += 1;
}

export function desbloquearScrollCorpo() {
  if (contadorBloqueio <= 0) return;
  contadorBloqueio -= 1;
  if (contadorBloqueio === 0) {
    document.body.style.overflow = '';
  }
}

export function resetarScrollCorpo() {
  contadorBloqueio = 0;
  document.body.style.overflow = '';
}
