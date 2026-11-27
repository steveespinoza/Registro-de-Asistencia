# Requisitos no funcionales

Estos requisitos establecen las condiciones de uso y verificación de la demo descrita en [[Problema y Objetivo]] y [[Requisitos Funcionales]].

## RNF-01 · Diseño mobile-first

El flujo del administrador debe diseñarse primero para celular en orientación vertical y adaptarse a pantallas más amplias. El menú lateral, los formularios, la búsqueda, las acciones de marcación y el historial deben poder usarse mediante controles táctiles.

**Criterio de aceptación.** En una pantalla de 360 px de ancho se puede dar de alta a una persona, buscarla, marcar su entrada y salida y consultar su historial sin desplazamiento horizontal ni elementos que tapen las acciones. El flujo sigue disponible en escritorio.

## RNF-02 · Accesibilidad y claridad

Los campos y botones deben tener etiquetas claras. Los controles deben mostrar un foco visible y la interfaz debe comunicar los estados y los errores mediante texto. El texto de uso normal debe alcanzar un contraste de al menos 4,5:1 respecto a su fondo.

**Criterio de aceptación.** Se puede completar el flujo con teclado en escritorio y ver qué control tiene el foco. Al intentar registrar un DNI duplicado, el mensaje identifica el problema sin depender del color.

## RNF-03 · Compatibilidad y distribución

La demo debe compilarse con Vite como sitio estático para ejecutarse en el navegador, con React, JavaScript y CSS. La verificación del MVP debe cubrir Chrome en Android, Safari en iPhone y un navegador de escritorio.

**Criterio de aceptación.** La compilación de producción se sirve desde un alojamiento estático y el flujo principal funciona en cada entorno de prueba.

## RNF-04 · Rendimiento de las operaciones

La búsqueda por nombre y el guardado de una marcación deben ofrecer una respuesta rápida en el celular. Como meta inicial de la demo, se propone mostrar el resultado o la confirmación en un segundo o menos con 100 empleados y 2 000 marcaciones de prueba.

**Criterio de aceptación.** Se registra el tiempo entre la acción y la respuesta visible en el celular usado para las pruebas, con los datos de prueba ya cargados.

## RNF-05 · Fiabilidad del guardado local

La aplicación debe confirmar un alta o una marcación solo cuando se haya guardado. Si el navegador bloquea `localStorage` o se produce un error de escritura, debe informar que la operación no se completó y preservar los registros ya guardados.

**Criterio de aceptación.** Con una falla de escritura simulada, la aplicación muestra un error, no confirma el nuevo registro y los datos previamente guardados siguen disponibles cuando el almacenamiento vuelve a estar accesible.

## RNF-06 · Consistencia de la hora de Lima

La conversión de la hora y la identificación del día de asistencia deben usar la zona `America/Lima` de manera consistente en todos los navegadores de prueba. La hora capturada depende del reloj del dispositivo.

**Criterio de aceptación.** Con la zona horaria del dispositivo configurada fuera de Lima, una entrada de las 23:59 de Lima y un intento de salida a las 00:00 se interpretan como fechas distintas. La entrada anterior figura como incompleta.

## RNF-07 · Privacidad de los datos

Los datos del personal, el historial y las fotos de las marcaciones deben permanecer en el almacenamiento local del navegador. La cámara se activa a petición del administrador y se libera al salir de la pantalla de marcación o cambiar de empleado. Las pruebas deben usar datos e imágenes ficticios.

**Criterio de aceptación.** Al revisar las solicitudes de red durante el alta, la búsqueda y la marcación, los datos del personal, las marcaciones y las fotos de prueba permanecen en el navegador.
