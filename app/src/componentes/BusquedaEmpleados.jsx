import { useState } from 'react'
import { buscarEmpleados, nombreCompleto } from '../dominio/empleados.js'
import EncabezadoPanel, { Icono } from './EncabezadoPanel.jsx'

export default function BusquedaEmpleados({ empleados, dniSeleccionado, onSeleccionar, accesoSeleccion }) {
  const [consulta, setConsulta] = useState('')
  const resultados = buscarEmpleados(empleados, consulta)
  const seleccionado = empleados.find(empleado => empleado.dni === dniSeleccionado)
  const ListaResultados = onSeleccionar ? 'fieldset' : 'ul'
  const cantidad = resultados.length
  let mensaje = cantidad === 1 ? '1 empleado' : `${cantidad} empleados`

  if (empleados.length === 0) {
    mensaje = 'Todavía no hay empleados registrados.'
  } else if (cantidad === 0) {
    mensaje = 'No se encontraron empleados con ese nombre.'
  }

  return (
    <section className="panel" aria-labelledby="titulo-busqueda">
      <EncabezadoPanel id="titulo-busqueda" icono={onSeleccionar ? 'buscar' : 'historial'}>
        {onSeleccionar ? 'Buscar personal' : 'Personal registrado'}
      </EncabezadoPanel>

      <div className="campo">
        <label htmlFor="buscar-nombre">Nombres o apellidos</label>
        <div className="entrada-busqueda">
          <Icono tipo="buscar" />
          <input
            className="control"
            id="buscar-nombre"
            type="search"
            autoComplete="off"
            value={consulta}
            onChange={evento => setConsulta(evento.target.value)}
          />
        </div>
      </div>

      <div className="resultados-resumen">
        <p className={cantidad ? 'resultados-cantidad' : 'estado-vacio'} role="status">{mensaje}</p>
        {seleccionado && accesoSeleccion && (
          <button
            type="button"
            className="acceso-seleccion"
            onClick={() => document.getElementById(accesoSeleccion.id)?.focus()}
          >
            {accesoSeleccion.irA}
          </button>
        )}
      </div>

      {cantidad > 0 && (
        <ListaResultados className="resultados" role={onSeleccionar ? undefined : 'list'}>
          {onSeleccionar && <legend className="solo-lectores">Seleccionar empleado</legend>}
          {resultados.map(empleado => {
            const { dni, puesto } = empleado
            const datos = (
              <span className="empleado__datos">
                <strong>{nombreCompleto(empleado)}</strong>
                <span className="empleado__dni">DNI {dni}</span>
                {typeof puesto === 'string' && puesto.trim() && <span className="empleado__puesto">{puesto}</span>}
              </span>
            )

            if (!onSeleccionar) return <li className="empleado" key={dni}>{datos}</li>

            const activo = dni === dniSeleccionado

            return (
              <label className={activo ? 'empleado empleado--seleccionable empleado--activo' : 'empleado empleado--seleccionable'} key={dni}>
                <input
                  type="radio"
                  name="empleado-seleccionado"
                  value={dni}
                  checked={activo}
                  onChange={() => onSeleccionar(dni)}
                />
                {datos}
              </label>
            )
          })}
        </ListaResultados>
      )}

      {seleccionado && !resultados.includes(seleccionado) && (
        <p className="seleccion-oculta">
          Selección actual <strong>{nombreCompleto(seleccionado)}</strong> · DNI {seleccionado.dni}
        </p>
      )}
    </section>
  )
}
