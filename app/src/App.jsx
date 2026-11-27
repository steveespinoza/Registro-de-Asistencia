import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import AccionesMarcacion from './componentes/AccionesMarcacion.jsx'
import BarraLateral from './componentes/BarraLateral.jsx'
import BusquedaEmpleados from './componentes/BusquedaEmpleados.jsx'
import FormularioEmpleado from './componentes/FormularioEmpleado.jsx'
import HistorialEmpleado from './componentes/HistorialEmpleado.jsx'
import { actualizarRegistro, cargarRegistro, observarRegistro } from './datos/registroLocal.js'
import { registrarMarcacion } from './dominio/asistencia.js'
import { darDeAltaEmpleado } from './dominio/empleados.js'
import { leerVista, observarVista, VISTAS } from './navegacion.js'

const panelesDeEmpleado = {
  asistencia: {
    id: 'titulo-marcaciones',
    titulo: 'Marcaciones',
    irA: 'Ir a marcaciones',
    ayuda: 'Selecciona un empleado para marcar su entrada o salida.',
  },
  historial: {
    id: 'titulo-historial',
    titulo: 'Asistencias registradas',
    irA: 'Ir al historial',
    ayuda: 'Selecciona un empleado para consultar sus asistencias.',
  },
}

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
  const vista = useSyncExternalStore(observarVista, leerVista)
  const vistaAnterior = useRef(vista)
  const tituloVista = useRef(null)
  const empleadoSeleccionado = registro?.empleados.find(empleado => empleado.dni === dniSeleccionado)
  const panelEmpleado = panelesDeEmpleado[vista]

  function recargarRegistro() {
    setRegistro(leerRegistroDisponible())
  }

  useEffect(() => observarRegistro(recargarRegistro), [])

  useEffect(() => {
    if (vistaAnterior.current === vista) return
    vistaAnterior.current = vista
    window.scrollTo(0, 0)
    tituloVista.current?.focus({ preventScroll: true })
  }, [vista])

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
    <div className="aplicacion">
      <BarraLateral vista={vista} />

      <main className="contenedor contenido">
        <h2 className="titulo-pagina" ref={tituloVista} tabIndex={-1}>{VISTAS[vista]}</h2>

        {registro === null && (
          <div className="aviso-carga">
            <p role="alert">No se pudo cargar el registro guardado en este navegador.</p>
            <button type="button" className="control boton" onClick={recargarRegistro}>
              Reintentar carga
            </button>
          </div>
        )}

        {vista === 'registro' && (
          <div className="columnas-vista">
            <FormularioEmpleado disponible={registro !== null} onGuardar={guardarEmpleado} />
            {registro && <BusquedaEmpleados empleados={registro.empleados} />}
          </div>
        )}

        {panelEmpleado && registro && (
          <div className="columnas-vista" key={vista}>
            <BusquedaEmpleados
              empleados={registro.empleados}
              dniSeleccionado={dniSeleccionado}
              onSeleccionar={setDniSeleccionado}
              accesoSeleccion={panelEmpleado}
            />

            {!empleadoSeleccionado && (
              <section className="panel" aria-labelledby={panelEmpleado.id}>
                <h3 id={panelEmpleado.id}>{panelEmpleado.titulo}</h3>
                <p className="estado-vacio">{panelEmpleado.ayuda}</p>
              </section>
            )}
            {empleadoSeleccionado && vista === 'asistencia' && (
              <AccionesMarcacion
                key={empleadoSeleccionado.dni}
                empleado={empleadoSeleccionado}
                onMarcar={guardarMarcacion}
              />
            )}
            {empleadoSeleccionado && vista === 'historial' && (
              <HistorialEmpleado empleado={empleadoSeleccionado} marcaciones={registro.marcaciones} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
