import { useEffect, useState } from 'react'
import { ENTRADA, historialPorDia } from '../dominio/asistencia.js'
import { nombreCompleto } from '../dominio/empleados.js'
import { fechaHoraLima } from '../dominio/tiempoLima.js'
import EncabezadoPanel from './EncabezadoPanel.jsx'
import FotoMarcacion from './FotoMarcacion.jsx'

function useFechaLima() {
  const [fecha, setFecha] = useState(() => fechaHoraLima(new Date()).fecha)

  useEffect(() => {
    let temporizador

    function actualizarFecha() {
      clearTimeout(temporizador)
      const ahora = new Date()
      const { fecha, hora } = fechaHoraLima(ahora)
      setFecha(fecha)

      const segundosParaElMinuto = 60 - Number(hora.slice(-2))
      temporizador = setTimeout(actualizarFecha, segundosParaElMinuto * 1000 - ahora.getUTCMilliseconds())
    }

    actualizarFecha()
    window.addEventListener('focus', actualizarFecha)
    document.addEventListener('visibilitychange', actualizarFecha)
    return () => {
      clearTimeout(temporizador)
      window.removeEventListener('focus', actualizarFecha)
      document.removeEventListener('visibilitychange', actualizarFecha)
    }
  }, [])

  return fecha
}

function estadoDelDia(dia) {
  if (dia.cuentaComoAsistencia) return 'Asistencia registrada'
  if (dia.diaTerminado) return 'Sin asistencia'
  return 'Asistencia pendiente'
}

export default function HistorialEmpleado({ empleado, marcaciones }) {
  const fechaActual = useFechaLima()
  const dias = historialPorDia(marcaciones, empleado.dni, fechaActual)

  return (
    <section className="panel" aria-labelledby="titulo-historial">
      <EncabezadoPanel id="titulo-historial" icono="historial" detalle="Hora de Lima" enfocable>
        Asistencias registradas
      </EncabezadoPanel>

      <div className="empleado__datos ficha-empleado historial-empleado">
        <strong>{nombreCompleto(empleado)}</strong>
        <span className="empleado__dni">DNI {empleado.dni}</span>
      </div>

      {dias.length === 0 && <p className="estado-vacio">Este empleado todavía no tiene marcaciones.</p>}

      {dias.map(dia => (
        <div className="historial-dia" key={dia.fecha}>
          <div className="historial-dia__encabezado">
            <h4><time dateTime={dia.fecha}>{dia.fecha.split('-').reverse().join('/')}</time></h4>
            <span
              className="estado-dia"
              data-estado={dia.cuentaComoAsistencia ? 'asistencia' : dia.diaTerminado ? 'sin-asistencia' : 'pendiente'}
            >
              {estadoDelDia(dia)}
            </span>
          </div>

          <ul className="movimientos">
            {dia.movimientos.map(({ id, tipo, instanteUtc, hora, estado, fotoId }) => (
              <li className="movimiento" key={id}>
                <div>
                  <strong>{tipo === ENTRADA ? 'Entrada' : 'Salida'}</strong>
                  {estado && <span className="movimiento__estado" data-incompleta={estado === 'Incompleta'}>{estado}</span>}
                </div>
                <time dateTime={instanteUtc}>{hora}</time>
                {fotoId && (
                  <FotoMarcacion fotoId={fotoId} descripcion={tipo === ENTRADA ? 'Foto de entrada' : 'Foto de salida'} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
