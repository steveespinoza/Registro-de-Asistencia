import { useEffect, useRef } from 'react'
import { VISTAS } from '../navegacion.js'
import { Icono } from './EncabezadoPanel.jsx'

function EnlacesNavegacion({ vista, alElegir }) {
  return (
    <nav className="navegacion" aria-label="Navegación principal">
      {Object.entries(VISTAS).map(([id, nombre]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={vista === id ? 'page' : undefined}
          onClick={alElegir}
        >
          <Icono tipo={id} />
          {nombre}
        </a>
      ))}
    </nav>
  )
}

export default function BarraLateral({ vista }) {
  const menu = useRef(null)
  const botonMenu = useRef(null)

  function abrirMenu() {
    botonMenu.current?.focus({ preventScroll: true })
    menu.current?.showModal()
  }

  function cerrarMenu() {
    menu.current?.close()
  }

  function elegirVista(evento) {
    if (evento.button !== 0 || evento.altKey || evento.ctrlKey || evento.metaKey || evento.shiftKey) return

    evento.preventDefault()
    window.location.hash = evento.currentTarget.hash
    cerrarMenu()
  }

  useEffect(() => {
    const escritorio = window.matchMedia('(min-width: 64rem)')
    function cerrarEnEscritorio(evento) {
      if (evento.matches) cerrarMenu()
    }
    escritorio.addEventListener('change', cerrarEnEscritorio)
    return () => escritorio.removeEventListener('change', cerrarEnEscritorio)
  }, [])

  return (
    <div className="barra-lateral">
      <header className="barra-superior">
        <div className="barra-superior__contenido">
          <span className="marca" aria-hidden="true">RA</span>
          <h1>Registro de Asistencia</h1>
        </div>
        <button
          type="button"
          ref={botonMenu}
          className="control boton abrir-menu"
          aria-haspopup="dialog"
          aria-controls="menu-movil"
          onClick={abrirMenu}
        >
          <span className="icono-menu" aria-hidden="true" />
          Menú
        </button>
      </header>

      <div className="menu-escritorio">
        <EnlacesNavegacion vista={vista} />
      </div>

      <dialog
        ref={menu}
        className="menu-movil"
        id="menu-movil"
        aria-labelledby="titulo-menu"
        onClick={evento => {
          if (evento.target === evento.currentTarget) cerrarMenu()
        }}
      >
        <div className="menu-movil__contenido">
          <div className="menu-movil__encabezado">
            <h2 id="titulo-menu">Menú</h2>
            <button type="button" className="control boton" onClick={cerrarMenu}>Cerrar</button>
          </div>
          <EnlacesNavegacion vista={vista} alElegir={elegirVista} />
        </div>
      </dialog>
    </div>
  )
}
