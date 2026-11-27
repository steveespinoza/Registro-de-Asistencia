import { useState } from 'react'
import { ENTRADA, ErrorMarcacion, SALIDA } from '../dominio/asistencia.js'
import { nombreCompleto } from '../dominio/empleados.js'
import { useCamara } from '../useCamara.js'

export default function AccionesMarcacion({ empleado, onMarcar }) {
  const [tipo, setTipo] = useState(ENTRADA)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const camara = useCamara()
  const camaraActiva = camara.estado === 'activa'
  const abriendoCamara = camara.estado === 'abriendo'
  const siguienteCamara = camara.orientacion === 'user' ? 'environment' : 'user'

  function elegirTipo(tipoElegido) {
    setTipo(tipoElegido)
    setError('')
    setConfirmacion('')
  }

  async function marcar() {
    if (guardando) return

    const instante = new Date()
    const conCamara = camara.estado !== 'apagada'
    setGuardando(true)
    setError('')
    setConfirmacion('')

    try {
      const foto = camaraActiva ? await camara.capturar().catch(() => null) : null
      const fotoGuardada = await onMarcar({ tipo, instante, foto })
      const texto = tipo === ENTRADA ? 'Entrada registrada' : 'Salida registrada'
      const detalle = fotoGuardada ? ' con foto' : conCamara ? ' sin foto' : ''
      setConfirmacion(`${texto}${detalle}.`)
    } catch (errorMarcacion) {
      setError(errorMarcacion instanceof ErrorMarcacion
        ? errorMarcacion.message
        : 'No se pudo guardar la marcación. Inténtalo de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <div className="empleado__datos ficha-empleado">
        <strong>{nombreCompleto(empleado)}</strong>
        <span className="empleado__dni">DNI {empleado.dni}</span>
      </div>

      <div className="camara-marcacion">
        <h4>Foto opcional</h4>
        <video
          ref={camara.video}
          className="camara-marcacion__vista"
          aria-label="Vista previa de la cámara"
          hidden={!camaraActiva}
          autoPlay
          muted
          playsInline
        />
        {!camara.disponible && (
          <p className="camara-marcacion__ayuda">
            {window.isSecureContext ? 'La cámara no está disponible en este navegador.' : 'Para usar la cámara, abre la aplicación en HTTPS.'}
          </p>
        )}
        {camara.disponible && (
          <div className="camara-marcacion__controles">
            {camara.estado === 'apagada' && (
              <button type="button" className="control boton" disabled={guardando} onClick={() => camara.abrir()}>
                Activar cámara
              </button>
            )}
            {camaraActiva && (
              <button
                type="button"
                className="control boton"
                disabled={guardando}
                onClick={() => camara.abrir(siguienteCamara, true)}
              >
                {siguienteCamara === 'user' ? 'Cambiar a frontal' : 'Cambiar a trasera'}
              </button>
            )}
            {(camaraActiva || abriendoCamara) && (
              <button type="button" className="control boton" onClick={camara.apagar}>
                {abriendoCamara ? 'Cancelar activación' : 'Apagar cámara'}
              </button>
            )}
          </div>
        )}
        <p className="camara-marcacion__ayuda" role="status">
          {abriendoCamara && 'Abriendo cámara…'}
          {camaraActiva && 'La foto se toma al marcar.'}
        </p>
        <p className="mensaje mensaje--error" role="alert">{camara.error}</p>
      </div>

      <div className="acciones-marcacion">
        <fieldset className="tipos-marcacion" disabled={guardando}>
          <legend>Tipo de marcación</legend>
          <div className="tipos-marcacion__opciones">
            <label className="control opcion-marcacion">
              <input
                type="radio"
                name="tipo-marcacion"
                value={ENTRADA}
                checked={tipo === ENTRADA}
                onChange={() => elegirTipo(ENTRADA)}
              />
              Entrada
            </label>
            <label className="control opcion-marcacion">
              <input
                type="radio"
                name="tipo-marcacion"
                value={SALIDA}
                checked={tipo === SALIDA}
                onChange={() => elegirTipo(SALIDA)}
              />
              Salida
            </label>
          </div>
        </fieldset>

        <button
          type="button"
          className="control boton boton--principal"
          aria-disabled={guardando}
          onClick={marcar}
        >
          {guardando ? 'Guardando…' : 'Marcar Asistencia'}
        </button>
      </div>

      <p className="mensaje mensaje--error" role="alert">{error}</p>
      <p className="mensaje mensaje--exito" role="status">{confirmacion}</p>
    </>
  )
}
