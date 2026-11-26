# Flujos del MVP

El administrador realiza el flujo completo desde el celular. La demo abre directamente en el navegador y conserva el personal y las marcaciones en ese mismo navegador. [[docs/06-Arquitectura/Arquitectura General|Arquitectura general]]

## Abrir o recargar la demo

```mermaid
flowchart TD
    A["Abrir o recargar la demo"] --> B["Leer registro-asistencia en localStorage"]
    B --> C{"Resultado de la lectura"}
    C -->|Hay datos guardados| D["Cargar empleados y marcaciones"]
    C -->|La clave no existe| E["Iniciar con listas vacías"]
    C -->|Error de lectura| F["Informar que el registro no pudo cargarse"]
    D --> G["Mostrar la interfaz del administrador"]
    E --> G
```

Después de recargar, el administrador puede volver a buscar a un empleado y consultar sus movimientos. Las validaciones usan la fecha actual de Lima. [[HU-07.Retomar el registro después de recargar|Historia de recuperación]]

## Dar de alta a un empleado

```mermaid
flowchart TD
    A["Abrir el alta e ingresar nombre y DNI"] --> B{"¿Están completos y el DNI es nuevo?"}
    B -->|No| C["Indicar el campo faltante o el DNI duplicado"]
    C --> A
    B -->|Sí| D["Intentar guardar el empleado"]
    D --> E{"¿Se guardó?"}
    E -->|Sí| F["Confirmar el alta del empleado"]
    E -->|No| G["Informar el error y conservar los datos previos"]
```

Después del alta, el empleado queda disponible en la búsqueda. Dos empleados pueden compartir el nombre si tienen DNI distintos. [[HU-01.Dar de alta a un empleado|Historia de alta]]

## Buscar, seleccionar y consultar

```mermaid
flowchart TD
    A["Buscar al empleado por nombre"] --> B{"¿Hay coincidencias?"}
    B -->|No| C["Mostrar aviso y permitir otra búsqueda"]
    C --> A
    B -->|Sí| D["Mostrar nombre y DNI de cada coincidencia"]
    D --> E["Seleccionar al empleado"]
    E --> F{"Acción del administrador"}
    F -->|Consultar historial| G["Mostrar las marcaciones de ese DNI"]
    F -->|Marcar entrada o salida| H["Continuar al flujo de marcación"]
```

El historial muestra el tipo, la fecha y la hora de Lima con segundos. Si el empleado aún carece de marcaciones, la aplicación indica que su historial está vacío. [[HU-02.Buscar y seleccionar a un empleado|Historia de búsqueda]] · [[HU-06.Consultar el historial de un empleado|Historia de consulta]]

## Marcar entrada o salida

```mermaid
flowchart TD
    A["Elegir entrada o salida para el DNI seleccionado"] --> B["Capturar el instante en UTC y obtener la fecha de Lima"]
    B --> C{"Tipo de marcación"}
    C -->|Entrada| D{"¿Ya hay una entrada abierta hoy?"}
    C -->|Salida| E{"¿Hay una entrada abierta hoy?"}
    D -->|Sí| F["Avisar y rechazar la entrada duplicada"]
    E -->|No| G["Avisar y rechazar la salida sin entrada del día"]
    D -->|No| H["Preparar la entrada"]
    E -->|Sí| I["Vincular la salida a la entrada"]
    H --> J["Intentar guardar la marcación"]
    I --> J
    J --> K{"¿Se guardó?"}
    K -->|Sí| L["Confirmar y actualizar el historial"]
    K -->|No| M["Informar el error y conservar los datos previos"]
```

Las decisiones sobre entradas abiertas se aplican al DNI seleccionado y a la fecha de Lima calculada al marcar. Al guardar una salida válida, el par cuenta como asistencia de ese día. [[HU-03.Marcar una entrada|Historia de entrada]] · [[HU-04.Marcar una salida|Historia de salida]]

## Cambio de fecha en Lima

| Situación | Resultado |
| --- | --- |
| La entrada aún no tiene salida durante su fecha de Lima. | Sigue abierta y el administrador puede cerrarla con una salida de esa misma fecha. |
| Llega la medianoche en Lima con una entrada sin salida. | La entrada queda incompleta en el historial. Si fue la única marcación, el día anterior no cuenta como asistencia. |
| El administrador marca en la fecha nueva. | Puede comenzar con una nueva entrada. Una salida requiere una entrada abierta en esa fecha. |

El estado se obtiene de las marcaciones guardadas y de la fecha de Lima al consultar o intentar marcar. [[HU-05.Registrar asistencia en un día nuevo|Historia de cambio de día]] · [[Modelo-de-Datos|Modelo de datos]]
