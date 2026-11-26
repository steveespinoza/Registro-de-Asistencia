# Alcance del MVP

El MVP es una demo web para que el administrador registre al personal, marque su asistencia al momento y consulte el historial desde un celular. El administrador es el único actor y accede directamente desde el navegador. El personal figura en los registros y las marcaciones. [[Actores]] · [[Rol-Administrador]]

## Funciones incluidas

| Función | Qué permite hacer |
| --- | --- |
| Alta de personal | Registrar a cada empleado con su nombre y un DNI único. El sistema rechaza el alta si ese DNI ya existe. |
| Búsqueda de personal | Buscar por nombre y seleccionar al empleado correcto. Los resultados muestran el DNI para distinguir a personas con el mismo nombre. |
| Marcación de asistencia | Registrar la entrada o salida del empleado seleccionado. La aplicación captura la fecha y hora automáticamente y las muestra con segundos en hora de Lima. |
| Historial por empleado | Consultar las entradas y salidas asociadas al DNI seleccionado y reconocer las entradas de días anteriores que quedaron incompletas. |
| Guardado local | Conservar el personal y las marcaciones al recargar la demo en el mismo navegador. |

## Regla de asistencia diaria

Un día cuenta como asistencia cuando el empleado tiene una entrada y su salida correspondiente en la misma fecha de Lima (`America/Lima`). Una entrada sin salida queda incompleta en el historial al cambiar de día y esa marcación no cuenta como asistencia. Al día siguiente, el administrador puede registrar una nueva entrada. [[Requisitos Funcionales#RF-08 · Validar la asistencia por día]]

## Entregable

Una demo compilable como sitio estático con React, JavaScript, CSS y Vite. La interfaz se diseña primero para celular y se adapta a escritorio. Los datos se conservan en `localStorage` y las marcaciones usan el reloj del dispositivo como referencia. [[Requisitos-No-Funcionales]]

## Cómo se comprobará el alcance

1. En un celular, el administrador da de alta a dos empleados ficticios con el mismo nombre y distintos DNI. Los encuentra por nombre y selecciona a uno por su DNI.
2. Registra una entrada y una salida en la misma fecha de Lima. Comprueba que el día cuenta como asistencia y que las marcas aparecen en el historial del empleado seleccionado tras recargar.
3. En una prueba que cruza la medianoche de Lima, deja una entrada sin salida. Comprueba que queda incompleta, que ese día no cuenta como asistencia y que puede registrar una nueva entrada en la fecha siguiente.
