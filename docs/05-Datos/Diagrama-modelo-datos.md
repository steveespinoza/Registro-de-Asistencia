# Diagrama de modelo de datos

El MVP guarda los empleados y sus marcaciones en `localStorage`. Cada marcación pertenece a un solo empleado. Un empleado puede tener cero o muchas marcaciones.

```mermaid
erDiagram
    EMPLEADO ||..o{ MARCACION : tiene
    MARCACION |o..o| MARCACION : cierra
    MARCACION ||..o| FOTO : adjunta

    EMPLEADO {
        string dni PK "Identificador único"
        string nombres "Dato de búsqueda"
        string apellidos "Dato de búsqueda"
        string puesto "Opcional"
    }

    MARCACION {
        string id PK "Identificador de la marcación"
        string dniEmpleado FK "DNI del empleado"
        string tipo "ENTRADA o SALIDA"
        string instanteUtc "Fecha y hora ISO 8601 en UTC"
        string entradaId FK, UK "Solo para SALIDA"
        string fotoId FK "Opcional"
    }

    FOTO {
        string id PK "Identificador en IndexedDB"
        blob imagen "JPEG local"
    }
```

`PK` identifica un registro. `FK` señala la referencia a otro registro. `UK` indica que el valor debe ser único cuando está presente. Estas reglas las aplica la aplicación al guardar los datos en el navegador.

## Reglas del modelo

- **Identificación.** El DNI se guarda como texto para conservar ceros iniciales. Los nombres y apellidos se usan para buscar y pueden repetirse entre empleados.
- **Límite diario.** Las nuevas marcaciones se limitan a una entrada y una salida por DNI y fecha de Lima.
- **Vínculo de entrada y salida.** Al guardar una salida, `entradaId` indica qué entrada cierra. Deben corresponder al mismo DNI y a la misma fecha de Lima.
- **Foto opcional.** La marcación referencia una foto guardada en IndexedDB cuando la captura y el guardado se completan.
- **Fecha de asistencia.** La aplicación calcula la fecha de Lima a partir de `instanteUtc` usando `America/Lima`. El día cuenta como asistencia cuando existe un par completo en esa fecha. Una entrada sin salida queda incompleta al cambiar el día y el administrador puede registrar una entrada nueva.

[[Alcance-MVP|Alcance del MVP]] · [[Requisitos Funcionales#RF-07 · Conservar los datos en el navegador|Guardado local]] · [[Requisitos Funcionales#RF-08 · Validar la asistencia por día|Regla diaria de asistencia]].

[[Modelo-de-Datos|Modelo de datos y diccionario de campos]].
