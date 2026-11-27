import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import AccionesMarcacion from './componentes/AccionesMarcacion.jsx'
import BarraLateral from './componentes/BarraLateral.jsx'
import BusquedaEmpleados from './componentes/BusquedaEmpleados.jsx'
import EncabezadoPanel from './componentes/EncabezadoPanel.jsx'
import FormularioEmpleado from './componentes/FormularioEmpleado.jsx'
import HistorialEmpleado from './componentes/HistorialEmpleado.jsx'
import SelectorEmpleado from './componentes/SelectorEmpleado.jsx'
import { eliminarFoto, guardarFoto } from './datos/fotosLocal.js'
import { actualizarRegistro, cargarRegistro, observarRegistro } from './datos/registroLocal.js'
import { registrarMarcacion } from './dominio/asistencia.js'
import { darDeAltaEmpleado } from './dominio/empleados.js'
import { leerVista, observarVista, VISTAS } from './navegacion.js'

const accesoHistorial = { id: 'titulo-historial', irA: 'Ir al historial' }

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

  async function guardarMarcacion({ tipo, instante, foto }) {
    const fotoId = foto ? await guardarFoto(foto).catch(() => undefined) : undefined
    try {
      await actualizarRegistro(actual => registrarMarcacion(actual, {
        tipo,
        dniEmpleado: dniSeleccionado,
        instante,
        fotoId,
      }))
    } catch (error) {
      if (fotoId) await eliminarFoto(fotoId).catch(() => {})
      throw error
    }
    recargarRegistro()
    return Boolean(fotoId)
  }

  return (
    <div className="aplicacion">
      <BarraLateral vista={vista} />

      <main className="contenedor contenido">
        <header className="cabecera-contenido">
          <h2 className="titulo-pagina" ref={tituloVista} tabIndex={-1}>{VISTAS[vista]}</h2>
        </header>

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

        {vista === 'asistencia' && registro && (
          <section className="panel panel--marcaciones" aria-labelledby="titulo-marcaciones">
            <EncabezadoPanel id="titulo-marcaciones" icono="asistencia">Marcaciones</EncabezadoPanel>
            <SelectorEmpleado
              empleados={registro.empleados}
              seleccionado={empleadoSeleccionado}
              onSeleccionar={setDniSeleccionado}
            />
            {empleadoSeleccionado && (
              <AccionesMarcacion
                key={empleadoSeleccionado.dni}
                empleado={empleadoSeleccionado}
                onMarcar={guardarMarcacion}
              />
            )}
          </section>
        )}

        {vista === 'historial' && registro && (
          <div className="columnas-vista">
            <BusquedaEmpleados
              empleados={registro.empleados}
              dniSeleccionado={dniSeleccionado}
              onSeleccionar={setDniSeleccionado}
              accesoSeleccion={accesoHistorial}
            />

            {empleadoSeleccionado ? (
              <HistorialEmpleado empleado={empleadoSeleccionado} marcaciones={registro.marcaciones} />
            ) : (
              <section className="panel" aria-labelledby={accesoHistorial.id}>
                <EncabezadoPanel id={accesoHistorial.id} icono="historial">Asistencias registradas</EncabezadoPanel>
                <p className="estado-vacio">Selecciona un empleado para consultar sus asistencias.</p>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
