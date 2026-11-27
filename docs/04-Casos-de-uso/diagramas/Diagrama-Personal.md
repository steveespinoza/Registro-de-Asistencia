# Diagrama de casos de uso del personal

El administrador realiza el alta con nombres, apellidos y DNI, y puede indicar el puesto. La búsqueda usa los nombres o apellidos y muestra el DNI de cada resultado. Las flechas punteadas con `«include»` indican comportamientos requeridos por el caso de uso que apunta a ellos.

```mermaid
flowchart LR
    admin["«actor»<br/>Administrador"]

    subgraph personal["Registro de Asistencia"]
        alta(["Dar de alta a un empleado"])
        buscar(["Buscar y seleccionar por nombres o apellidos"])
        historial(["Consultar historial por empleado"])
        validarDni(["Validar que el DNI sea único"])

        alta -.->|«include»| validarDni
        historial -.->|«include»| buscar
    end

    admin --- alta
    admin --- buscar
    admin --- historial
```

El alta se rechaza si el DNI ya está registrado. Si hay empleados con el mismo nombre, el administrador distingue los resultados por DNI y consulta las marcaciones de la persona seleccionada.

[[Diagrama-General|Diagrama general]] · [[Requisitos Funcionales]].
