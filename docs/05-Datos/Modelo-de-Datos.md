# Modelo de datos

El MVP guarda empleados y marcaciones en el navegador. El DNI identifica a cada empleado y vincula sus marcaciones con su historial. Un empleado puede tener cero o muchas marcaciones. [[Diagrama-modelo-datos|Diagrama de modelado de datos]]

## Empleado

| Campo | Tipo | Regla |
| --- | --- | --- |
| `dni` | Texto | Obligatorio y único. Se guarda como texto para conservar los ceros iniciales. |
| `nombres` | Texto | Obligatorio en las altas nuevas. Se usa para buscar. |
| `apellidos` | Texto | Obligatorio en las altas nuevas. Se usa para buscar. |
| `puesto` | Texto | Opcional. Se omite cuando el campo se deja vacío. |

La aplicación muestra el nombre completo a partir de los nombres y apellidos. Los registros anteriores conservan su campo `nombre` y siguen disponibles para la búsqueda y la consulta.

## Marcación

| Campo | Tipo | Regla |
| --- | --- | --- |
| `id` | Texto | Obligatorio y único. La aplicación lo asigna al guardar la marcación. |
| `dniEmpleado` | Texto | Obligatorio. Debe corresponder al DNI de un empleado registrado. |
| `tipo` | Texto | Obligatorio. Acepta `ENTRADA` o `SALIDA`. |
| `instanteUtc` | Texto | Obligatorio. La aplicación captura el instante al marcar y lo guarda en formato ISO 8601 en UTC, con sufijo `Z`. |
| `entradaId` | Texto | Obligatorio en una `SALIDA`. Contiene el `id` de la entrada que cierra. En una `ENTRADA` se omite el campo. |
| `fotoId` | Texto | Opcional. Identifica la foto local asociada con la marcación. Se omite cuando la marcación se registra sin foto. |

## Reglas de asistencia

- La aplicación deriva la fecha de asistencia y la hora visible desde `instanteUtc` usando `America/Lima`. El historial muestra la hora con segundos.
- Para nuevas marcaciones, cada combinación de DNI, fecha de Lima y tipo admite un solo registro. La aplicación conserva en el historial las marcaciones que ya se habían guardado con la regla anterior.
- Una salida cierra una entrada previamente guardada, abierta y del mismo DNI en la misma fecha de Lima. El mismo `entradaId` puede aparecer en una sola salida.
- Una entrada sin salida sigue abierta durante su fecha de Lima.
- Al cambiar la fecha de Lima, la entrada sin salida se muestra como incompleta. El administrador puede registrar una nueva entrada. El día cuenta como asistencia si existe al menos un par de entrada y salida en esa fecha.

El estado de cada entrada y el resultado diario se calculan a partir de las marcaciones guardadas y la fecha de Lima. [[Requisitos Funcionales#RF-08 · Validar la asistencia por día|Regla de asistencia por día]]

## Guardado en el navegador

El modelo usa un objeto JSON con las colecciones `empleados` y `marcaciones`, guardado en `localStorage` bajo la clave `registro-asistencia`. Si la clave todavía no existe, la demo comienza con ambas listas vacías. Al recargar la misma demo en el mismo navegador, la aplicación recupera lo guardado.

La aplicación comprueba que se cumplan las reglas del modelo antes de guardar. Confirma el alta o la marcación una vez guardado el objeto. Si falla la escritura, informa el error y conserva los datos ya guardados. [[Requisitos Funcionales#RF-07 · Conservar los datos en el navegador|Guardado local]] · [[Requisitos-No-Funcionales#RNF-05 · Fiabilidad del guardado local|Fiabilidad del guardado]]

Las fotos se guardan como imágenes JPEG en IndexedDB, en la colección `fotos` de la base `registro-asistencia-fotos`. La marcación conserva solo su identificador `fotoId`. Si falla el guardado de la foto, la marcación puede completarse sin ella. Las marcaciones anteriores siguen disponibles en el historial. [[Requisitos Funcionales#RF-09 · Adjuntar una foto opcional|Foto opcional]]

## Ejemplo con datos ficticios

```json
{
  "empleados": [
    {
      "dni": "00001234",
      "nombres": "Alex",
      "apellidos": "Ejemplo",
      "puesto": "Auxiliar administrativo"
    }
  ],
  "marcaciones": [
    {
      "id": "m-001",
      "dniEmpleado": "00001234",
      "tipo": "ENTRADA",
      "instanteUtc": "2026-11-25T18:00:00.000Z"
    },
    {
      "id": "m-002",
      "dniEmpleado": "00001234",
      "tipo": "SALIDA",
      "instanteUtc": "2026-11-26T01:00:00.000Z",
      "entradaId": "m-001"
    },
    {
      "id": "m-003",
      "dniEmpleado": "00001234",
      "tipo": "ENTRADA",
      "instanteUtc": "2026-11-26T13:05:00.000Z"
    }
  ]
}
```

En Lima, `m-001` y `m-002` ocurren el 25 de noviembre de 2026 a las 13:00:00 y 20:00:00. Ese día cuenta como asistencia. La marcación `m-003` ocurrió el 26 de noviembre a las 08:05:00. Si llega el 27 de noviembre sin una salida correspondiente, esa entrada se muestra como incompleta y el día 26 queda sin asistencia.
