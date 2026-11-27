import { useCallback, useEffect, useRef, useState } from 'react'

function detenerPistas(flujo) {
  flujo?.getTracks().forEach(pista => pista.stop())
}

export function useCamara() {
  const video = useRef(null)
  const flujo = useRef(null)
  const solicitud = useRef(0)
  const [estado, setEstado] = useState('apagada')
  const [orientacion, setOrientacion] = useState(null)
  const [error, setError] = useState('')
  const disponible = typeof navigator.mediaDevices?.getUserMedia === 'function'

  const liberar = useCallback(() => {
    solicitud.current += 1
    detenerPistas(flujo.current)
    flujo.current = null
    if (video.current) video.current.srcObject = null
  }, [])

  useEffect(() => {
    function alSalir() {
      liberar()
      setEstado('apagada')
    }
    window.addEventListener('pagehide', alSalir)
    return () => {
      window.removeEventListener('pagehide', alSalir)
      liberar()
    }
  }, [liberar])

  function apagar() {
    liberar()
    setEstado('apagada')
    setError('')
  }

  async function abrir(direccion = 'environment', exacta = false) {
    liberar()
    const idSolicitud = solicitud.current
    setEstado('abriendo')
    setError('')

    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: exacta ? { exact: direccion } : { ideal: direccion } },
      })

      if (idSolicitud !== solicitud.current || !video.current) {
        detenerPistas(media)
        return
      }

      flujo.current = media
      const pista = media.getVideoTracks()[0]
      const modo = pista.getSettings().facingMode
      setOrientacion(modo ?? (exacta ? direccion : null))
      pista.addEventListener('ended', () => {
        if (idSolicitud !== solicitud.current) return
        liberar()
        setEstado('apagada')
        setError('Se desconectó la cámara. Puedes marcar sin foto.')
      }, { once: true })
      video.current.srcObject = media
      setEstado('activa')
      await video.current.play()
    } catch (fallo) {
      if (idSolicitud !== solicitud.current) return
      liberar()
      setEstado('apagada')
      if (fallo.name === 'NotAllowedError') {
        setError('El navegador bloqueó el acceso a la cámara. Puedes marcar sin foto.')
      } else if (exacta) {
        setError('La cámara seleccionada no está disponible. Puedes activar la cámara de nuevo o marcar sin foto.')
      } else {
        setError('No se pudo abrir la cámara. Puedes marcar sin foto.')
      }
    }
  }

  async function capturar() {
    const vista = video.current
    if (!flujo.current?.active || !vista?.videoWidth || !vista.videoHeight
      || vista.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return null

    const lienzo = document.createElement('canvas')
    const escala = Math.min(1, 640 / Math.max(vista.videoWidth, vista.videoHeight))
    lienzo.width = Math.max(1, Math.round(vista.videoWidth * escala))
    lienzo.height = Math.max(1, Math.round(vista.videoHeight * escala))
    const contexto = lienzo.getContext('2d')
    if (!contexto) return null
    contexto.drawImage(vista, 0, 0, lienzo.width, lienzo.height)
    return new Promise(resolve => lienzo.toBlob(resolve, 'image/jpeg', 0.72))
  }

  return { video, estado, orientacion, error, disponible, abrir, apagar, capturar }
}
