export function Icono({ tipo }) {
  return <span className={`icono-lineal icono--${tipo}`} aria-hidden="true" />
}

export default function EncabezadoPanel({ id, icono, detalle, enfocable, children }) {
  return (
    <div className="panel__encabezado">
      <div className="panel__titulo">
        <Icono tipo={icono} />
        <h3 id={id} tabIndex={enfocable ? -1 : undefined}>{children}</h3>
      </div>
      {detalle && <p className="panel__detalle">{detalle}</p>}
    </div>
  )
}
