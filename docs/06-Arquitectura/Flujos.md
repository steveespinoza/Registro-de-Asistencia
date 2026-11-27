# Flujos del MVP

El administrador realiza el flujo completo desde el celular. La demo abre directamente en el navegador y conserva el personal y las marcaciones en ese mismo navegador. [[docs/06-Arquitectura/Arquitectura General|Arquitectura general]]

La navegación ofrece **Registro** para dar de alta y ver al personal, **Asistencia** para marcar e **Historial** para consultar los registros por empleado. Al cambiar entre Asistencia e Historial, la aplicación conserva el DNI seleccionado durante esa sesión.

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
    A["Ingresar nombres, apellidos y DNI. Añadir puesto si corresponde"] --> B{"¿Están los campos obligatorios y el DNI es nuevo?"}
    B -->|No| C["Indicar el campo faltante o el DNI duplicado"]
    C --> A
    B -->|Sí| D["Intentar guardar el empleado"]
    D --> E{"¿Se guardó?"}
    E -->|Sí| F["Confirmar el alta del empleado"]
    E -->|No| G["Informar el error y conservar los datos previos"]
```

Después del alta, el empleado aparece en **Personal registrado** y queda disponible en la búsqueda de las otras vistas. Dos empleados pueden compartir el nombre si tienen DNI distintos. [[HU-01.Dar de alta a un empleado|Historia de alta]]

## Buscar, seleccionar y consultar

```mermaid
flowchart TD
    S["Abrir Asistencia o Historial"] --> A
    A["Buscar al empleado por nombres o apellidos"] --> B{"¿Hay coincidencias?"}
    B -->|No| C["Mostrar aviso y permitir otra búsqueda"]
    C --> A
    B -->|Sí| D["Mostrar nombre y DNI de cada coincidencia"]
    D --> E["Seleccionar al empleado"]
    E --> F{"Sección activa"}
    F -->|Historial| G["Mostrar las marcaciones de ese DNI"]
    F -->|Asistencia| H["Continuar al flujo de marcación"]
```

En **Asistencia**, el desplegable muestra coincidencias desde la segunda letra. Al elegir a una persona, sus controles de marcación aparecen debajo del buscador. Si se edita el nombre, se debe volver a elegir un DNI. [[HU-02.Buscar y seleccionar a un empleado|Historia de búsqueda]]

El historial muestra el tipo, la fecha y la hora de Lima con segundos. Si el empleado aún carece de marcaciones, la aplicación indica que su historial está vacío. [[HU-06.Consultar el historial de un empleado|Historia de consulta]]

## Marcar entrada o salida

```mermaid
flowchart TD
    A["Elegir Entrada o Salida para el DNI seleccionado"] --> T["Pulsar Marcar Asistencia"]
    T --> B["Capturar el instante en UTC y obtener la fecha de Lima"]
    B --> P["Capturar una foto si la cámara está activa"]
    P --> C{"Tipo de marcación"}
    C -->|Entrada| D{"¿Ya se registró una entrada en esa fecha?"}
    C -->|Salida| E{"¿Ya se registró una salida en esa fecha?"}
    D -->|Sí| F["Avisar y rechazar la entrada duplicada"]
    E -->|Sí| N["Avisar y rechazar la salida duplicada"]
    E -->|No| O{"¿Hay una entrada en esa fecha?"}
    O -->|No| G["Avisar y rechazar la salida sin entrada del día"]
    D -->|No| H["Preparar la entrada"]
    O -->|Sí| I["Vincular la salida a la entrada"]
    H --> J["Intentar guardar la marcación"]
    I --> J
    J --> K{"¿Se guardó?"}
    K -->|Sí| L["Confirmar y actualizar el historial"]
    K -->|No| M["Informar el error y conservar los datos previos"]
```

El límite de una entrada y una salida se aplica al DNI seleccionado y a la fecha de Lima calculada al marcar. Al guardar una salida válida, el par cuenta como asistencia de ese día. [[HU-03.Marcar una entrada|Historia de entrada]] · [[HU-04.Marcar una salida|Historia de salida]]

Si la cámara está activa, se toma la foto al pulsar **Marcar Asistencia**. En celular se solicita primero la cámara trasera y el administrador puede alternar a la frontal. Si la cámara está desactivada o falla la captura o el guardado de la foto, se registra la marcación sin foto. Las fotos guardadas se abren desde el movimiento correspondiente en **Historial**. [[Requisitos Funcionales#RF-09 · Adjuntar una foto opcional]]

## Cambio de fecha en Lima

| Situación | Resultado |
| --- | --- |
| La entrada aún no tiene salida durante su fecha de Lima. | Sigue abierta y el administrador puede cerrarla con una salida de esa misma fecha. |
| Llega la medianoche en Lima con una entrada sin salida. | La entrada queda incompleta en el historial. Si fue la única marcación, el día anterior no cuenta como asistencia. |
| El administrador marca en la fecha nueva. | Puede comenzar con una nueva entrada. Una salida requiere una entrada abierta en esa fecha. |

El estado se obtiene de las marcaciones guardadas y de la fecha de Lima al consultar o intentar marcar. [[HU-05.Registrar asistencia en un día nuevo|Historia de cambio de día]] · [[Modelo-de-Datos|Modelo de datos]]
