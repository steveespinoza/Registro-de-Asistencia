# Requisitos Funcionales

Estos requisitos describen el flujo del [[Rol-Administrador]], único actor de la demo. El flujo completo debe estar disponible desde celular, según el enfoque mobile-first definido en [[Problema y Objetivo]].

## RF-01 · Acceder a la demo

La aplicación debe abrir directamente desde el navegador, sin inicio de sesión.

**Criterio de aceptación.** Al abrir la aplicación, el administrador puede comenzar un alta o consultar el personal existente en **Registro**. La navegación permite abrir **Asistencia** e **Historial**.

## RF-02 · Dar de alta a un empleado

El administrador debe poder registrar a un empleado con su nombre y DNI. Ambos datos son obligatorios y el DNI identifica de forma única el registro.

**Criterio de aceptación.** Se pueden guardar dos empleados con el mismo nombre y distintos DNI. Si falta el nombre o el DNI, o si el DNI ya está registrado, la aplicación informa el motivo y el alta se rechaza.

## RF-03 · Buscar y seleccionar a un empleado

El administrador debe poder buscar al personal registrado por nombre en **Asistencia** y **Historial**. Cada resultado debe mostrar el nombre y el DNI para que pueda seleccionar el registro correcto.

**Criterio de aceptación.** Si dos empleados comparten un nombre, la búsqueda devuelve ambos y permite seleccionarlos por separado.

## RF-04 · Registrar una entrada o salida

En **Asistencia**, el administrador selecciona al empleado y registra el evento como entrada o salida en el momento. La aplicación debe asociar cada marcación al DNI del empleado seleccionado.

**Criterio de aceptación.** Al registrar una entrada y luego una salida en la misma fecha de Lima, ambas quedan vinculadas al empleado elegido y cada una conserva su tipo.

## RF-05 · Capturar y mostrar la fecha y hora

La aplicación debe capturar automáticamente la fecha y hora al marcar, usando el reloj del dispositivo como referencia. Debe mostrar la fecha y la hora en la zona `America/Lima`, con precisión de segundos.

**Criterio de aceptación.** Al marcar desde un dispositivo configurado en otra zona horaria, la fecha y hora del historial se muestran como corresponden en Lima.

## RF-06 · Consultar el historial de un empleado

En **Historial**, el administrador consulta las marcaciones del empleado seleccionado. Cada movimiento debe mostrar su tipo, fecha y hora de Lima.

**Criterio de aceptación.** Al seleccionar a dos empleados con el mismo nombre en consultas sucesivas, cada historial muestra únicamente las marcaciones del DNI seleccionado.

## RF-07 · Conservar los datos en el navegador

Los empleados y sus marcaciones deben guardarse en el almacenamiento local del navegador (`localStorage`) y recuperarse al volver a cargar la aplicación.

**Criterio de aceptación.** Tras dar de alta a un empleado y registrar una marcación, ambos registros siguen disponibles al recargar la página en el mismo navegador.

## RF-08 · Validar la asistencia por día

Para cada empleado y fecha de Lima (`America/Lima`), la aplicación permite registrar como máximo una entrada y una salida. La salida debe corresponder a la entrada abierta del mismo empleado en esa fecha. Un día cuenta como asistencia cuando el empleado tiene una entrada y su salida correspondiente. Al llegar la medianoche de Lima, una entrada sin salida queda incompleta en el historial.

**Criterios de aceptación.**

- Si se registra una entrada y su salida antes de medianoche en Lima, ese día cuenta como asistencia.
- Si se intenta registrar una segunda entrada para el mismo DNI y fecha, la aplicación avisa y la rechaza tanto antes como después de guardar la salida.
- Si se intenta registrar una segunda salida para el mismo DNI y fecha, la aplicación avisa y conserva la salida original.
- Si el empleado solo marcó su entrada en una fecha, al cambiar de día en Lima esa marcación queda incompleta en el historial y la fecha no cuenta como asistencia.
- Al día siguiente, el sistema rechaza una salida sin una entrada abierta de la nueva fecha y permite empezar el día con una nueva entrada.
