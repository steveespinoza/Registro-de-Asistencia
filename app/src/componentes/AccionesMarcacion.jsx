import { useState } from 'react'
import { ENTRADA, ErrorMarcacion, SALIDA } from '../dominio/asistencia.js'

export default function AccionesMarcacion({ empleado, onMarcar }) {
  const [pendiente, setPendiente] = useState(null)
  const [error, setError] = useState('')
  const [confirmacion, setConfirmacion] = useState('')

  async function marcar(tipo) {
    if (pendiente) return

    setPendiente(tipo)
    setError('')
    setConfirmacion('')

    try {
      await onMarcar(tipo)
      setConfirmacion(tipo === ENTRADA ? 'Entrada registrada.' : 'Salida registrada.')
    } catch (errorMarcacion) {
      setError(errorMarcacion instanceof ErrorMarcacion
        ? errorMarcacion.message
        : 'No se pudo guardar la marcación. Inténtalo de nuevo.')
    } finally {
      setPendiente(null)
    }
  }

  return (
    <section className="panel" aria-labelledby="titulo-marcaciones">
      <h3 id="titulo-marcaciones" tabIndex={-1}>Marcaciones</h3>
      <div className="empleado__datos">
        <strong>{empleado.nombre}</strong>
        <span className="empleado__dni">DNI {empleado.dni}</span>
      </div>

      <div className="acciones-marcacion">
        <button
          type="button"
          className="control boton boton--principal"
          aria-disabled={pendiente !== null}
          onClick={() => marcar(ENTRADA)}
        >
          {pendiente === ENTRADA ? 'Guardando…' : 'Marcar entrada'}
        </button>
        <button
          type="button"
          className="control boton"
          aria-disabled={pendiente !== null}
          onClick={() => marcar(SALIDA)}
        >
          {pendiente === SALIDA ? 'Guardando…' : 'Marcar salida'}
        </button>
      </div>

      <p className="mensaje mensaje--error" role="alert">{error}</p>
      <p className="mensaje mensaje--exito" role="status">{confirmacion}</p>
    </section>
  )
}
