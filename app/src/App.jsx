export default function App() {
  return (
    <>
      <header className="barra-superior">
        <div className="contenedor barra-superior__contenido">
          <span className="marca" aria-hidden="true">RA</span>
          <h1>Registro de Asistencia</h1>
        </div>
      </header>

      <main className="contenedor contenido">
        <section className="panel" aria-labelledby="titulo-personal">
          <h2 id="titulo-personal">Personal</h2>
          <p>El alta y la búsqueda de empleados se incorporarán en la siguiente etapa.</p>
        </section>
      </main>
    </>
  )
}
