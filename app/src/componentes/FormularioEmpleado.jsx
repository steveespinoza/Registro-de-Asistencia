import { useState } from 'react'
import { ErrorAltaEmpleado } from '../dominio/empleados.js'

export default function FormularioEmpleado({ disponible, onGuardar }) {
  const [error, setError] = useState(null)
  const [confirmacion, setConfirmacion] = useState('')
  const [guardando, setGuardando] = useState(false)

  function limpiarMensajes() {
    setError(null)
    setConfirmacion('')
  }

  async function enviarAlta(evento) {
    evento.preventDefault()
    if (!disponible || guardando) return

    const formulario = evento.currentTarget
    const campos = Object.fromEntries(new FormData(formulario))
    limpiarMensajes()
    setGuardando(true)

    try {
      await onGuardar(campos)
      formulario.reset()
      setConfirmacion('Empleado registrado.')
    } catch (errorAlta) {
      if (errorAlta instanceof ErrorAltaEmpleado) {
        setError({ campo: errorAlta.campo, mensaje: errorAlta.message })
        formulario.elements.namedItem(errorAlta.campo)?.focus()
      } else {
        setError({ mensaje: 'No se pudo guardar el alta. Inténtalo de nuevo.' })
      }
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="panel" aria-labelledby="titulo-alta">
      <h3 id="titulo-alta">Registrar empleado</h3>

      <form className="formulario" onSubmit={enviarAlta} onChange={limpiarMensajes} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            className="control"
            id="nombre"
            name="nombre"
            autoComplete="off"
            required
            readOnly={guardando}
            aria-invalid={error?.campo === 'nombre'}
            aria-describedby={error?.campo === 'nombre' ? 'error-alta' : undefined}
          />
        </div>

        <div className="campo">
          <label htmlFor="dni">DNI</label>
          <input
            className="control"
            id="dni"
            name="dni"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required
            readOnly={guardando}
            aria-invalid={error?.campo === 'dni'}
            aria-describedby={error?.campo === 'dni' ? 'error-alta' : undefined}
          />
        </div>

        <button
          type="submit"
          className="control boton boton--principal"
          disabled={!disponible}
          aria-disabled={guardando || undefined}
        >
          {guardando ? 'Guardando…' : 'Guardar empleado'}
        </button>

        <div>
          <p id="error-alta" className="mensaje mensaje--error" role="alert">{error?.mensaje}</p>
          <p className="mensaje mensaje--exito" role="status">{confirmacion}</p>
        </div>
      </form>
    </section>
  )
}
