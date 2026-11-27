# Rol - Administrador

El administrador opera la demo desde el navegador. Su trabajo consiste en identificar al empleado correcto y registrar su entrada o salida cuando ocurre.

## Dar de alta al personal

El administrador ingresa los nombres, apellidos y DNI del empleado. Puede agregar su puesto. Dos personas pueden compartir el mismo nombre si sus DNI son distintos. Si el DNI ya está registrado, el sistema rechaza el alta.

## Registrar una entrada o salida

1. Buscar al empleado por nombre.
2. Seleccionarlo en los resultados. Si aparecen nombres iguales, verificar el DNI mostrado.
3. Marcar la entrada o la salida en el momento en que ocurre.

El sistema asocia la marcación al DNI del empleado, captura la fecha y hora automáticamente y la muestra en hora de Lima (`America/Lima`), con precisión de segundos.

Cada empleado puede registrar una entrada y una salida por fecha de Lima. La salida cierra la entrada de ese día. Si el día termina sin salida, la entrada queda incompleta en el historial y ese día no cuenta como asistencia. Al día siguiente, el administrador puede registrar una nueva entrada.

## Consultar el historial

El administrador busca por nombre y selecciona al empleado para consultar sus entradas y salidas. Cada movimiento muestra el tipo de marcación, la fecha y la hora de Lima. El historial se conserva en el mismo navegador después de recargar la página.

## Alcance de la demo

El acceso es directo, sin inicio de sesión. El flujo cubre marcaciones hechas en el momento. La recuperación de marcaciones olvidadas y la corrección de errores quedan fuera del alcance de la demo.

Consulta [[Actores]] y [[Problema y Objetivo]].
