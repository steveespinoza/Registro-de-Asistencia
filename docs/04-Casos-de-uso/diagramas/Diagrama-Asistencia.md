# Diagrama de casos de uso de asistencia

El administrador busca al empleado por nombre y lo selecciona por su DNI. Tanto la entrada como la salida requieren guardar la marcación con el DNI y capturar la fecha y hora automáticamente.

```mermaid
flowchart LR
    admin["«actor»<br/>Administrador"]

    subgraph asistencia["Registro de Asistencia"]
        entrada(["Marcar entrada"])
        salida(["Marcar salida"])
        guardar(["Guardar la marcación con fecha, hora y DNI"])

        entrada -.->|«include»| guardar
        salida -.->|«include»| guardar
    end

    admin --- entrada
    admin --- salida
```

## Reglas de la marcación

- **Entrada.** Se acepta cuando el empleado no tiene otra entrada abierta en la fecha de Lima.
- **Salida.** Se acepta cuando hay una entrada abierta del mismo empleado en esa fecha. El par completo cuenta como asistencia de ese día.
- **Cambio de fecha.** La entrada sin salida queda incompleta en el historial. Al día siguiente se puede marcar una nueva entrada.

[[Diagrama-General|Diagrama general]] · [[Requisitos Funcionales#RF-08 · Validar la asistencia por día|Regla de asistencia por día]].
