import { useEffect, useState } from 'react'
import { ENTRADA, historialPorDia } from '../dominio/asistencia.js'
import { fechaHoraLima } from '../dominio/tiempoLima.js'

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
      <div className="historial-encabezado">
        <h3 id="titulo-historial" tabIndex={-1}>Asistencias registradas</h3>
        <p>Hora de Lima</p>
      </div>

      <div className="empleado__datos historial-empleado">
        <strong>{empleado.nombre}</strong>
        <span className="empleado__dni">DNI {empleado.dni}</span>
      </div>

      {dias.length === 0 && <p className="estado-vacio">Este empleado todavía no tiene marcaciones.</p>}

      {dias.map(dia => (
        <div className="historial-dia" key={dia.fecha}>
          <div className="historial-dia__encabezado">
            <h4><time dateTime={dia.fecha}>{dia.fecha.split('-').reverse().join('/')}</time></h4>
            <span className={dia.cuentaComoAsistencia ? 'estado-dia estado-dia--asistencia' : 'estado-dia'}>
              {estadoDelDia(dia)}
            </span>
          </div>

          <ul className="movimientos">
            {dia.movimientos.map(({ id, tipo, instanteUtc, hora, estado }) => (
              <li className="movimiento" key={id}>
                <div>
                  <strong>{tipo === ENTRADA ? 'Entrada' : 'Salida'}</strong>
                  {estado && <span className="movimiento__estado">{estado}</span>}
                </div>
                <time dateTime={instanteUtc}>{hora}</time>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
