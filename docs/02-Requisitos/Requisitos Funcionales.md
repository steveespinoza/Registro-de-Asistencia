# Requisitos Funcionales

Estos requisitos describen el flujo del [[Rol-Administrador]], único actor de la demo. El flujo completo debe estar disponible desde celular, según el enfoque mobile-first definido en [[Problema y Objetivo]].

## RF-01 · Acceder a la demo

La aplicación debe abrir directamente desde el navegador, sin inicio de sesión.

**Criterio de aceptación.** Al abrir la aplicación, el administrador puede comenzar un alta o consultar el personal existente en **Registro**. La navegación permite abrir **Asistencia** e **Historial**.

## RF-02 · Dar de alta a un empleado

El administrador registra al empleado con nombres, apellidos y DNI en campos separados. Estos datos son obligatorios. El puesto es opcional y el DNI identifica de forma única el registro.

**Criterio de aceptación.** Se pueden guardar dos empleados con los mismos nombres y apellidos si tienen distintos DNI. Si falta un campo obligatorio o el DNI ya está registrado, la aplicación informa el motivo y rechaza el alta. El puesto, cuando se completa, aparece en el listado de personal.

## RF-03 · Buscar y seleccionar a un empleado

El administrador puede buscar al personal por nombres o apellidos en **Registro**, **Asistencia** e **Historial**. La búsqueda ignora mayúsculas y tildes. Cada resultado muestra el nombre completo y el DNI para identificar al empleado.

**Criterio de aceptación.** En **Asistencia**, las coincidencias se muestran en un desplegable desde la segunda letra. Si dos empleados comparten un nombre, aparecen ambos y se pueden seleccionar por separado. Al elegir uno, los controles de marcación aparecen en el mismo panel.

## RF-04 · Registrar una entrada o salida

En **Asistencia**, el administrador selecciona al empleado, elige **Entrada** o **Salida** y pulsa **Marcar Asistencia** para guardar. La aplicación debe asociar cada marcación al DNI del empleado seleccionado.

**Criterio de aceptación.** Cambiar entre **Entrada** y **Salida** solo cambia el tipo seleccionado. Al confirmar cada marcación en la misma fecha de Lima con **Marcar Asistencia**, ambas quedan vinculadas al empleado elegido y conservan su tipo.

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

## RF-09 · Adjuntar una foto opcional

El administrador puede activar la cámara desde **Asistencia**. Mientras esté activa, la aplicación toma una foto al pulsar **Marcar Asistencia**. En celular solicita la trasera por defecto y permite cambiar a la frontal. Si la cámara está apagada, no hay permiso o la foto no puede capturarse o guardarse, el administrador puede completar la marcación.

**Criterio de aceptación.** Desde una página con acceso a la cámara, activa la cámara trasera, registra una entrada, cambia a la frontal y registra la salida. Tras recargar, cada foto aparece en la marcación correspondiente de **Historial**. Con la cámara apagada o sin permiso, una marcación válida también se guarda.
