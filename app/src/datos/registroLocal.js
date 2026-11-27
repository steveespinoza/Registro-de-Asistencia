import { ENTRADA, SALIDA } from '../dominio/asistencia.js'

const CLAVE_REGISTRO = 'registro-asistencia'

function esMarcacionLegible(marcacion) {
  return typeof marcacion?.id === 'string' && Boolean(marcacion.id.trim())
    && typeof marcacion.dniEmpleado === 'string' && Boolean(marcacion.dniEmpleado.trim())
    && typeof marcacion.instanteUtc === 'string' && marcacion.instanteUtc.endsWith('Z')
    && Number.isFinite(Date.parse(marcacion.instanteUtc))
    && (marcacion.tipo === ENTRADA
      || (marcacion.tipo === SALIDA && typeof marcacion.entradaId === 'string' && Boolean(marcacion.entradaId.trim())))
}

export function cargarRegistro() {
  const contenido = localStorage.getItem(CLAVE_REGISTRO)
  if (contenido === null) {
    return { empleados: [], marcaciones: [] }
  }

  const registro = JSON.parse(contenido)
  if (!Array.isArray(registro?.empleados) || !Array.isArray(registro.marcaciones)) {
    throw new Error('El registro guardado tiene un formato inválido.')
  }

  const dnis = new Set()
  for (const empleado of registro.empleados) {
    const dni = typeof empleado?.dni === 'string' ? empleado.dni.trim() : ''
    if (!dni || dnis.has(dni) || typeof empleado.nombre !== 'string' || !empleado.nombre.trim()) {
      throw new Error('El registro guardado contiene datos de personal inválidos.')
    }
    dnis.add(dni)
  }

  const ids = new Set()
  for (const marcacion of registro.marcaciones) {
    if (!esMarcacionLegible(marcacion) || ids.has(marcacion.id)) {
      throw new Error('El registro guardado contiene marcaciones inválidas.')
    }
    ids.add(marcacion.id)
  }

  return registro
}

export async function actualizarRegistro(actualizar) {
  function guardar() {
    const registro = actualizar(cargarRegistro())
    localStorage.setItem(CLAVE_REGISTRO, JSON.stringify(registro))
  }

  if (navigator.locks) {
    await navigator.locks.request(CLAVE_REGISTRO, guardar)
  } else {
    guardar()
  }
}

export function observarRegistro(recargar) {
  function alCambiar(evento) {
    if (evento.key === CLAVE_REGISTRO || evento.key === null) {
      recargar()
    }
  }

  window.addEventListener('storage', alCambiar)
  return () => window.removeEventListener('storage', alCambiar)
}
