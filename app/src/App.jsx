import { useEffect, useState } from 'react'
import AccionesMarcacion from './componentes/AccionesMarcacion.jsx'
import BusquedaEmpleados from './componentes/BusquedaEmpleados.jsx'
import FormularioEmpleado from './componentes/FormularioEmpleado.jsx'
import HistorialEmpleado from './componentes/HistorialEmpleado.jsx'
import { actualizarRegistro, cargarRegistro, observarRegistro } from './datos/registroLocal.js'
import { registrarMarcacion } from './dominio/asistencia.js'
import { darDeAltaEmpleado } from './dominio/empleados.js'

function leerRegistroDisponible() {
  try {
    return cargarRegistro()
  } catch {
    return null
  }
}

export default function App() {
  const [registro, setRegistro] = useState(leerRegistroDisponible)
  const [dniSeleccionado, setDniSeleccionado] = useState(null)
  const empleadoSeleccionado = registro?.empleados.find(empleado => empleado.dni === dniSeleccionado)

  function recargarRegistro() {
    setRegistro(leerRegistroDisponible())
  }

  useEffect(() => observarRegistro(recargarRegistro), [])

  async function guardarEmpleado(campos) {
    await actualizarRegistro(actual => darDeAltaEmpleado(actual, campos))
    recargarRegistro()
  }

  async function guardarMarcacion(tipo) {
    const instante = new Date()
    await actualizarRegistro(actual => registrarMarcacion(actual, {
      tipo,
      dniEmpleado: dniSeleccionado,
      instante,
    }))
    recargarRegistro()
  }

  return (
    <>
      <header className="barra-superior">
        <div className="contenedor barra-superior__contenido">
          <span className="marca" aria-hidden="true">RA</span>
          <h1>Registro de Asistencia</h1>
        </div>
      </header>

      <main className="contenedor contenido">
        <h2 className="titulo-pagina">Personal</h2>

        {registro === null && (
          <div className="aviso-carga">
            <p role="alert">No se pudo cargar el registro guardado en este navegador.</p>
            <button type="button" className="control boton" onClick={recargarRegistro}>
              Reintentar carga
            </button>
          </div>
        )}

        <div className="personal">
          <FormularioEmpleado disponible={registro !== null} onGuardar={guardarEmpleado} />
          {registro !== null && (
            <BusquedaEmpleados
              empleados={registro.empleados}
              dniSeleccionado={dniSeleccionado}
              onSeleccionar={setDniSeleccionado}
            />
          )}
        </div>

        {empleadoSeleccionado && (
          <div className="asistencia">
            <AccionesMarcacion
              key={empleadoSeleccionado.dni}
              empleado={empleadoSeleccionado}
              onMarcar={guardarMarcacion}
            />
            <HistorialEmpleado dniEmpleado={empleadoSeleccionado.dni} marcaciones={registro.marcaciones} />
          </div>
        )}
      </main>
    </>
  )
}
