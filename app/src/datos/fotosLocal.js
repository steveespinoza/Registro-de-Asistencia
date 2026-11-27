const BASE_FOTOS = 'registro-asistencia-fotos'
const ALMACEN_FOTOS = 'fotos'

function abrirBase() {
  return new Promise((resolve, reject) => {
    const solicitud = indexedDB.open(BASE_FOTOS, 1)
    solicitud.onupgradeneeded = () => solicitud.result.createObjectStore(ALMACEN_FOTOS)
    solicitud.onsuccess = () => resolve(solicitud.result)
    solicitud.onerror = () => reject(solicitud.error)
  })
}

async function operar(modo, accion) {
  const base = await abrirBase()
  try {
    return await new Promise((resolve, reject) => {
      const transaccion = base.transaction(ALMACEN_FOTOS, modo)
      const solicitud = accion(transaccion.objectStore(ALMACEN_FOTOS))
      transaccion.oncomplete = () => resolve(solicitud.result)
      transaccion.onabort = () => reject(transaccion.error ?? new Error('Se canceló la operación de la foto.'))
    })
  } finally {
    base.close()
  }
}

export async function guardarFoto(foto) {
  const id = crypto.randomUUID()
  const imagen = { bytes: await foto.arrayBuffer(), tipo: foto.type }
  await operar('readwrite', almacen => almacen.add(imagen, id))
  return id
}

export async function cargarFoto(id) {
  const imagen = await operar('readonly', almacen => almacen.get(id))
  if (!(imagen?.bytes instanceof ArrayBuffer)) return null
  return new Blob([imagen.bytes], { type: imagen.tipo })
}

export function eliminarFoto(id) {
  return operar('readwrite', almacen => almacen.delete(id))
}
