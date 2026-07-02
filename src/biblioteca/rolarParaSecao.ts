export function rolarParaSecao(href: string) {
  if (!href.startsWith('#')) return;

  const id = href.slice(1);
  const target = id ? document.getElementById(id) : null;

  if (!target) {
    if (!id) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const headerHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height')
  );
  const offset = Number.isFinite(headerHeight) ? headerHeight : 72;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
  window.history.pushState(null, '', href);
}
