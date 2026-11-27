export const VISTAS = {
  registro: 'Registro',
  asistencia: 'Asistencia',
  historial: 'Historial',
}

export function leerVista() {
  const vista = window.location.hash.slice(1)
  return Object.hasOwn(VISTAS, vista) ? vista : 'registro'
}

export function observarVista(actualizar) {
  window.addEventListener('hashchange', actualizar)
  return () => window.removeEventListener('hashchange', actualizar)
}
