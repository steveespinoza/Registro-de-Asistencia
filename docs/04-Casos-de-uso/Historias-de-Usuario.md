# Historias de usuario

Todas las historias corresponden al [[Rol-Administrador]], único actor del MVP. El flujo se verifica primero desde un celular con controles táctiles, según [[Requisitos-No-Funcionales]]. Los códigos RF remiten a [[Requisitos Funcionales]].

## HU-01 · Dar de alta a un empleado

Como administrador, quiero registrar el nombre y DNI de un empleado para identificarlo al momento de marcar su asistencia.

**Criterios de aceptación**

- Cuando abro la demo desde el navegador, puedo comenzar un alta directamente, sin iniciar sesión.
- Si ingreso un nombre y un DNI que todavía no está registrado, el sistema guarda al empleado. Puede haber dos empleados con el mismo nombre si tienen DNI distintos.
- Si falta el nombre o el DNI, o si el DNI ya está registrado, el sistema explica el motivo y rechaza el alta.

**Requisitos relacionados** · RF-01 y RF-02.

[[HU-01.Dar de alta a un empleado|Ver la historia detallada]]

## HU-02 · Buscar y seleccionar a un empleado

Como administrador, quiero buscar por nombre para encontrar al empleado cuya asistencia debo marcar o consultar.

**Criterios de aceptación**

- Cuando busco por nombre, cada resultado muestra el nombre y el DNI.
- Si dos empleados comparten el nombre, ambos aparecen en los resultados. Puedo distinguirlos por DNI y seleccionar el registro correcto.

**Requisito relacionado** · RF-03.

[[HU-02.Buscar y seleccionar a un empleado|Ver la historia detallada]]

## HU-03 · Marcar una entrada

Como administrador, quiero marcar la entrada al momento en que llega el empleado para dejar constancia de cuándo comenzó su jornada.

**Criterios de aceptación**

- Con el empleado seleccionado y sin otra entrada abierta en esa fecha de Lima, al marcar la entrada el sistema la guarda asociada a su DNI y captura la fecha y hora automáticamente.
- Aunque el dispositivo esté configurado en otra zona horaria, la marca se muestra con fecha y hora de Lima, incluidos los segundos.
- Si ya existe una entrada abierta del mismo empleado para esa fecha, el sistema avisa y rechaza la segunda entrada.

**Requisitos relacionados** · RF-04, RF-05 y RF-08.

[[HU-03.Marcar una entrada|Ver la historia detallada]]

## HU-04 · Marcar una salida

Como administrador, quiero marcar la salida cuando se retira el empleado para completar su asistencia de ese día.

**Criterios de aceptación**

- Si el empleado tiene una entrada abierta de la misma fecha de Lima, la salida se guarda con su DNI y la fecha y hora del momento. El día cuenta como asistencia.
- Si el empleado carece de una entrada abierta para esa fecha, el sistema avisa y rechaza la salida.

**Requisitos relacionados** · RF-04, RF-05 y RF-08.

[[HU-04.Marcar una salida|Ver la historia detallada]]

## HU-05 · Registrar asistencia en un día nuevo

Como administrador, quiero iniciar una nueva jornada aunque ayer haya quedado una entrada abierta, para registrar la asistencia del día actual.

**Criterios de aceptación**

- Si el empleado solo tiene una entrada a las 23:59 de Lima, al llegar las 00:00 la marca anterior queda incompleta en el historial y esa fecha no cuenta como asistencia.
- Un intento de salida en la fecha nueva se rechaza si el empleado todavía no tiene una entrada abierta ese día. El sistema permite registrar una nueva entrada.

**Requisito relacionado** · RF-08.

[[HU-05.Registrar asistencia en un día nuevo|Ver la historia detallada]]

## HU-06 · Consultar el historial de un empleado

Como administrador, quiero consultar las marcaciones de un empleado para revisar sus entradas, salidas y jornadas incompletas.

**Criterios de aceptación**

- Al seleccionar a un empleado, el historial muestra las marcaciones asociadas a su DNI con tipo, fecha y hora de Lima.
- Si cambio a un empleado con el mismo nombre y otro DNI, veo el historial de la persona seleccionada.
- Si un día anterior quedó con una única entrada, esta se puede consultar como incompleta.

**Requisitos relacionados** · RF-06 y RF-08.

[[HU-06.Consultar el historial de un empleado|Ver la historia detallada]]

## HU-07 · Retomar el registro después de recargar

Como administrador, quiero recuperar el personal y sus marcaciones al recargar la demo para continuar registrando asistencia.

**Criterio de aceptación**

- Después de dar de alta a un empleado y guardar su entrada, al recargar en el mismo navegador puedo volver a encontrarlo por nombre y consultar la entrada guardada en su historial.

**Requisito relacionado** · RF-07.

[[HU-07.Retomar el registro después de recargar|Ver la historia detallada]]

Consulta [[Diagrama-General]] para ver la relación entre el administrador y los casos de uso.
