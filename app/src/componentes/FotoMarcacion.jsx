import { useEffect, useState } from 'react'
import { cargarFoto } from '../datos/fotosLocal.js'

function ImagenGuardada({ fotoId, descripcion }) {
  const [estado, setEstado] = useState({ url: null, error: false })

  useEffect(() => {
    let activa = true
    let url
    cargarFoto(fotoId).then(foto => {
      if (!activa) return
      if (!foto) {
        setEstado({ url: null, error: true })
        return
      }
      url = URL.createObjectURL(foto)
      setEstado({ url, error: false })
    }).catch(() => {
      if (activa) setEstado({ url: null, error: true })
    })
    return () => {
      activa = false
      if (url) URL.revokeObjectURL(url)
    }
  }, [fotoId])

  if (estado.error) return <p role="status">La foto no está disponible.</p>
  if (!estado.url) return <p role="status">Cargando foto…</p>
  return <img src={estado.url} alt={descripcion} />
}

export default function FotoMarcacion({ fotoId, descripcion }) {
  const [abierta, setAbierta] = useState(false)

  return (
    <details className="foto-marcacion" onToggle={evento => setAbierta(evento.currentTarget.open)}>
      <summary aria-label={`Ver ${descripcion.toLowerCase()}`}>Ver foto</summary>
      {abierta && <ImagenGuardada key={fotoId} fotoId={fotoId} descripcion={descripcion} />}
    </details>
  )
}
