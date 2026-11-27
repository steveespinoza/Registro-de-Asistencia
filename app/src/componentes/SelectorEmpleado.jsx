import { useEffect, useId, useState } from 'react'
import { buscarEmpleados, nombreCompleto } from '../dominio/empleados.js'
import { Icono } from './EncabezadoPanel.jsx'

export default function SelectorEmpleado({ empleados, seleccionado, onSeleccionar }) {
  const listaId = useId()
  const ayudaId = useId()
  const [busqueda, setBusqueda] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [dniActivo, setDniActivo] = useState(null)
  const consulta = seleccionado ? nombreCompleto(seleccionado) : busqueda
  const suficientesLetras = (consulta.match(/\p{L}/gu)?.length ?? 0) >= 2
  const resultados = !seleccionado && suficientesLetras ? buscarEmpleados(empleados, consulta) : []
  const mostrarLista = abierto && resultados.length > 0
  const indiceActivo = resultados.findIndex(empleado => empleado.dni === dniActivo)
  const opcionActivaId = mostrarLista && indiceActivo >= 0 ? `${listaId}-${indiceActivo}` : undefined
  let ayuda = ''

  if (empleados.length === 0) {
    ayuda = 'Todavía no hay empleados registrados.'
  } else if (!seleccionado && !suficientesLetras) {
    ayuda = 'Escribe al menos dos letras para buscar.'
  } else if (!seleccionado && resultados.length === 0) {
    ayuda = 'No se encontraron empleados con ese nombre.'
  }

  useEffect(() => {
    if (opcionActivaId) document.getElementById(opcionActivaId)?.scrollIntoView({ block: 'nearest' })
  }, [opcionActivaId])

  function cerrarLista() {
    setAbierto(false)
    setDniActivo(null)
  }

  function editarConsulta(evento) {
    setBusqueda(evento.target.value)
    if (seleccionado) onSeleccionar(null)
    setAbierto(true)
    setDniActivo(null)
  }

  function elegirEmpleado(dni) {
    onSeleccionar(dni)
    setBusqueda('')
    cerrarLista()
  }

  function manejarTecla(evento) {
    if (evento.nativeEvent.isComposing) return

    if (evento.key === 'Escape' && mostrarLista) {
      evento.preventDefault()
      cerrarLista()
    } else if (evento.key === 'Enter' && opcionActivaId) {
      evento.preventDefault()
      elegirEmpleado(dniActivo)
    } else if (resultados.length > 0 && (evento.key === 'ArrowDown' || evento.key === 'ArrowUp')) {
      evento.preventDefault()
      const siguienteIndice = evento.key === 'ArrowDown'
        ? Math.min(indiceActivo + 1, resultados.length - 1)
        : (indiceActivo < 0 ? resultados.length - 1 : Math.max(indiceActivo - 1, 0))
      setAbierto(true)
      setDniActivo(resultados[siguienteIndice].dni)
    }
  }

  return (
    <div className="campo selector-empleado">
      <label htmlFor="buscar-nombre">Nombres o apellidos</label>
      <div className="entrada-busqueda">
        <Icono tipo="buscar" />
        <input
          className="control"
          id="buscar-nombre"
          type="search"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={mostrarLista}
          aria-controls={mostrarLista ? listaId : undefined}
          aria-activedescendant={opcionActivaId}
          aria-describedby={ayuda ? ayudaId : undefined}
          value={consulta}
          onFocus={() => setAbierto(true)}
          onBlur={cerrarLista}
          onChange={editarConsulta}
          onKeyDown={manejarTecla}
        />
        {mostrarLista && (
          <ul className="selector-empleado__lista" id={listaId} role="listbox" aria-label="Coincidencias de personal">
            {resultados.map((empleado, indice) => (
              <li
                key={empleado.dni}
                id={`${listaId}-${indice}`}
                className="selector-empleado__opcion empleado__datos"
                role="option"
                aria-selected={empleado.dni === dniActivo}
                onMouseDown={evento => evento.preventDefault()}
                onClick={() => elegirEmpleado(empleado.dni)}
              >
                <strong>{nombreCompleto(empleado)}</strong>
                <span className="empleado__dni">DNI {empleado.dni}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="selector-empleado__ayuda" id={ayudaId} role="status">{ayuda}</p>
    </div>
  )
}
