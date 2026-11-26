# Diagrama general de casos de uso

El administrador es el único actor de la demo. El recuadro delimita las funciones del sistema y las líneas continuas muestran las acciones que puede iniciar el administrador.

```mermaid
flowchart LR
    admin["«actor»<br/>Administrador"]

    subgraph mvp["Registro de Asistencia"]
        alta(["Dar de alta a un empleado"])
        buscar(["Buscar y seleccionar a un empleado"])
        entrada(["Marcar entrada"])
        salida(["Marcar salida"])
        historial(["Consultar historial por empleado"])
    end

    admin --- alta
    admin --- buscar
    admin --- entrada
    admin --- salida
    admin --- historial
```

[[Diagrama-Personal|Alta, búsqueda e historial]] · [[Diagrama-Asistencia|Marcación de asistencia]]

Referencias: [[Actores]] · [[Alcance-MVP]].
