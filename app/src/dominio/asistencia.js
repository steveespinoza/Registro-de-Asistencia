import { fechaHoraLima } from './tiempoLima.js'

export const ENTRADA = 'ENTRADA'
export const SALIDA = 'SALIDA'

export class ErrorMarcacion extends Error {}

function entradasCerradas(marcacionesDelDia) {
  const entradas = new Set(
    marcacionesDelDia.filter(marcacion => marcacion.tipo === ENTRADA).map(({ id }) => id),
  )
  return new Set(marcacionesDelDia
    .filter(marcacion => marcacion.tipo === SALIDA && entradas.has(marcacion.entradaId))
    .map(({ entradaId }) => entradaId))
}

function siguienteId(marcaciones) {
  const ids = new Set(marcaciones.map(({ id }) => id))
  let numero = marcaciones.length + 1
  while (ids.has(`m-${numero}`)) numero += 1
  return `m-${numero}`
}

export function registrarMarcacion(registro, { dniEmpleado, tipo, instante, fotoId }) {
  if (tipo !== ENTRADA && tipo !== SALIDA) {
    throw new TypeError('Tipo de marcación inválido.')
  }
  if (!registro.empleados.some(empleado => empleado.dni === dniEmpleado)) {
    throw new ErrorMarcacion('El empleado seleccionado ya no está en el registro.')
  }

  const { fecha } = fechaHoraLima(instante)
  const marcacionesDelDia = registro.marcaciones.filter(marcacion =>
    marcacion.dniEmpleado === dniEmpleado
    && fechaHoraLima(new Date(marcacion.instanteUtc)).fecha === fecha,
  )
  const entradaDelDia = marcacionesDelDia.find(marcacion => marcacion.tipo === ENTRADA)

  if (tipo === ENTRADA && entradaDelDia) {
    throw new ErrorMarcacion('Ya hay una entrada registrada para este empleado en la fecha de Lima.')
  }
  if (tipo === SALIDA && marcacionesDelDia.some(marcacion => marcacion.tipo === SALIDA)) {
    throw new ErrorMarcacion('Ya hay una salida registrada para este empleado en la fecha de Lima.')
  }
  if (tipo === SALIDA && !entradaDelDia) {
    throw new ErrorMarcacion('No hay una entrada abierta para este empleado en la fecha de Lima.')
  }

  const marcacion = {
    id: siguienteId(registro.marcaciones),
    dniEmpleado,
    tipo,
    instanteUtc: instante.toISOString(),
  }
  if (tipo === SALIDA) marcacion.entradaId = entradaDelDia.id
  if (fotoId) marcacion.fotoId = fotoId

  return { ...registro, marcaciones: [...registro.marcaciones, marcacion] }
}

export function historialPorDia(marcaciones, dniEmpleado, fechaActual) {
  const grupos = new Map()
  for (const marcacion of marcaciones) {
    if (marcacion.dniEmpleado !== dniEmpleado) continue

    const instante = new Date(marcacion.instanteUtc)
    const { fecha, hora } = fechaHoraLima(instante)
    if (!grupos.has(fecha)) grupos.set(fecha, [])
    grupos.get(fecha).push({ ...marcacion, hora, timestamp: instante.getTime() })
  }

  return [...grupos.keys()].sort().reverse().map(fecha => {
    const movimientos = grupos.get(fecha)
    const cerradas = entradasCerradas(movimientos)
    const diaTerminado = fecha < fechaActual
    const estadoSinSalida = diaTerminado ? 'Incompleta' : 'Abierta'

    return {
      fecha,
      cuentaComoAsistencia: cerradas.size > 0,
      diaTerminado,
      movimientos: movimientos.reverse().sort((a, b) => b.timestamp - a.timestamp)
        .map(({ id, tipo, instanteUtc, hora, fotoId }) => ({
          id,
          tipo,
          instanteUtc,
          hora,
          fotoId: typeof fotoId === 'string' ? fotoId : undefined,
          estado: tipo === ENTRADA && !cerradas.has(id) ? estadoSinSalida : null,
        })),
    }
  })
}
