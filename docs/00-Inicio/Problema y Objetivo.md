# Problema y Objetivo

## Problema

Para llevar el control de asistencia del personal, se necesita saber a qué empleado corresponde cada entrada o salida y en qué momento ocurrió. Cuando las entradas y salidas se anotan en distintos lugares o con formatos inconsistentes, cuesta reconstruir el historial de una persona y detectar una entrada que todavía está pendiente de salida.

El proyecto surge de la necesidad de reunir el registro del personal y sus marcaciones en un mismo lugar, con una referencia horaria común para Lima, Perú.

## Objetivo general

Desarrollar una aplicación web para que el administrador pueda dar de alta al personal, registrar sus entradas y salidas con la fecha y hora de Lima al momento de marcar y consultar el historial de cada empleado.

## Objetivos específicos

- Usar el DNI como identificador único de cada empleado y asociar sus marcaciones a ese DNI.
- Capturar automáticamente la fecha y hora de cada entrada o salida y mostrarla con precisión de segundos en la zona horaria `America/Lima`.
- Contar un día como asistencia cuando el empleado tiene una entrada y su salida correspondiente en la misma fecha de Lima.
- Diseñar la interfaz con enfoque **mobile-first**, priorizando el flujo completo del administrador en celular y adaptándolo a pantallas más amplias.
- Conservar los datos al recargar la página.

## Usuario y alcance de la demo

El administrador es el único usuario de la demo y accede directamente, sin iniciar sesión. Da de alta al personal con su nombre y DNI. Para registrar una entrada o salida o consultar el historial, busca al empleado por nombre y lo selecciona en los resultados. Si hay nombres iguales, usa el DNI mostrado para distinguirlos. Los empleados figuran en el registro de personal y en el historial de asistencia.

La demo cubre las marcaciones hechas en el momento. La recuperación de marcaciones olvidadas y la corrección de errores se reservan para una eventual ampliación del alcance.

La primera versión se plantea como una aplicación web estática con React, Vite y CSS. Los datos se guardarán en el almacenamiento local del navegador (`localStorage`). Esto permite demostrar el flujo desde un mismo navegador. La hora capturada depende del reloj del dispositivo y cada navegador conserva su propio registro.

## Criterios de éxito

- Desde un celular, el administrador puede dar de alta a un empleado, buscarlo por nombre, marcar su entrada y salida y consultar su historial con controles táctiles y sin desplazamiento horizontal.
- El administrador abre la aplicación directamente y puede dar de alta a dos empleados con el mismo nombre y distintos DNI. El sistema rechaza un alta con un DNI ya registrado.
- Al buscar un nombre compartido, aparecen ambos empleados con sus DNI y el administrador puede consultar sus historiales por separado.
- El administrador selecciona a un empleado y registra una entrada y una salida. El historial muestra el tipo, la fecha y la hora de cada movimiento en hora de Lima.
- Después de recargar la página en el mismo navegador, se conservan el personal y las marcaciones guardadas.
- Si el día termina en Lima con una entrada sin salida, esa marcación queda incompleta en el historial y el día no cuenta como asistencia. El administrador puede registrar una nueva entrada al día siguiente.

## Decisiones pendientes

- Determinar si una futura versión necesita compartir el historial entre equipos o validar la hora con un servidor.
