# Alcance del MVP

El MVP es una demo web para que el administrador registre al personal, marque su asistencia al momento y consulte el historial desde un celular. El administrador es el único actor y accede directamente desde el navegador. El personal figura en los registros y las marcaciones. [[Actores]] · [[Rol-Administrador]]

## Funciones incluidas

| Función | Qué permite hacer |
| --- | --- |
| Alta de personal | Registrar nombres, apellidos y un DNI único, con un campo opcional para el puesto. |
| Búsqueda de personal | Buscar por nombres o apellidos. Los resultados muestran el DNI para distinguir a personas con el mismo nombre. |
| Marcación de asistencia | Registrar la entrada o salida del empleado seleccionado. La aplicación captura la fecha y hora automáticamente y las muestra con segundos en hora de Lima. |
| Foto opcional | Tomar una foto al marcar si la cámara está activa. En un celular, el navegador solicita primero la cámara trasera y el administrador puede cambiar a la frontal. La foto se puede consultar en el historial. |
| Historial por empleado | Consultar las entradas y salidas asociadas al DNI seleccionado y reconocer las entradas de días anteriores que quedaron incompletas. |
| Guardado local | Conservar el personal y las marcaciones al recargar la demo en el mismo navegador. |

## Navegación

- **Registro** permite dar de alta y consultar el personal registrado.
- **Asistencia** reúne la búsqueda y la marcación en un panel. Desde la segunda letra, el desplegable permite elegir al empleado por nombre y DNI para marcar su entrada o salida.
- **Historial** permite buscar a un empleado y consultar sus asistencias por DNI.

La barra lateral está disponible en pantallas amplias. En celular se abre desde el botón **Menú**.

## Regla de asistencia diaria

Cada empleado puede registrar como máximo una entrada y una salida por fecha de Lima (`America/Lima`). El día cuenta como asistencia cuando tiene el par completo. Una entrada sin salida queda incompleta en el historial al cambiar de día y esa marcación no cuenta como asistencia. Al día siguiente, el administrador puede registrar una nueva entrada. [[Requisitos Funcionales#RF-08 · Validar la asistencia por día]]

## Entregable

Una demo compilable como sitio estático con React, JavaScript, CSS y Vite. La interfaz se diseña primero para celular y se adapta a escritorio. Los registros se conservan en `localStorage` y las fotos en IndexedDB. Las marcaciones usan el reloj del dispositivo como referencia. [[Requisitos-No-Funcionales]]

## Cómo se comprobará el alcance

1. Desde **Registro**, el administrador da de alta a dos empleados ficticios con el mismo nombre y distintos DNI y comprueba que aparecen en el listado.
2. En **Asistencia**, busca por nombre, selecciona a uno por su DNI y registra una entrada y una salida en la misma fecha de Lima. Comprueba que se rechazan nuevas marcaciones para ese DNI y fecha. Después de recargar, abre **Historial** y comprueba que ambas marcas se conservan y que el día cuenta como asistencia.
3. En una prueba que cruza la medianoche de Lima, deja una entrada sin salida. Comprueba que queda incompleta, que ese día no cuenta como asistencia y que puede registrar una nueva entrada en la fecha siguiente.
