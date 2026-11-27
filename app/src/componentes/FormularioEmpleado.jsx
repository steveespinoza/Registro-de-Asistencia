import { useState } from 'react'
import { ErrorAltaEmpleado } from '../dominio/empleados.js'
import EncabezadoPanel from './EncabezadoPanel.jsx'

const CAMPOS_ALTA = [
  { campo: 'nombres', etiqueta: 'Nombres', requerido: true },
  { campo: 'apellidos', etiqueta: 'Apellidos', requerido: true },
  { campo: 'dni', etiqueta: 'DNI', requerido: true, inputMode: 'numeric' },
  { campo: 'puesto', etiqueta: 'Puesto (opcional)' },
]

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
    <section className="panel panel--alta" aria-labelledby="titulo-alta">
      <EncabezadoPanel id="titulo-alta" icono="registro">Registrar empleado</EncabezadoPanel>

      <form className="formulario" onSubmit={enviarAlta} onChange={limpiarMensajes} noValidate>
        <div className="campos-formulario">
          {CAMPOS_ALTA.map(({ campo, etiqueta, requerido, inputMode }) => {
            const invalido = error?.campo === campo
            return (
              <div className="campo" key={campo}>
                <label htmlFor={campo}>{etiqueta}</label>
                <input
                  className="control"
                  id={campo}
                  name={campo}
                  type="text"
                  inputMode={inputMode}
                  autoComplete="off"
                  required={requerido}
                  readOnly={guardando}
                  aria-invalid={invalido}
                  aria-describedby={invalido ? 'error-alta' : undefined}
                />
              </div>
            )
          })}
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
