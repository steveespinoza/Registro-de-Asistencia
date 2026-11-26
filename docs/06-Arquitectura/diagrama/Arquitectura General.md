# Diagrama de arquitectura general

La demo se distribuye como un sitio estático. El administrador realiza todo el flujo en su navegador, con una interfaz diseñada primero para celular.

```mermaid
flowchart TB
    vite["Vite · Compilación"]
    sitio["Alojamiento estático"]
    admin["Administrador<br/>Celular o escritorio"]

    subgraph navegador["Navegador"]
        interfaz["Interfaz mobile-first<br/>React con JSX y CSS"]
        logica["Lógica en JavaScript<br/>Personal, asistencia e historial"]
        tiempo["Fecha y hora<br/>Reloj del dispositivo, UTC y America/Lima"]
        datos[("localStorage<br/>Empleados y marcaciones en JSON")]

        interfaz <-->|Acciones y resultados| logica
        logica -->|Captura y conversión horaria| tiempo
        logica <-->|Lectura y escritura| datos
    end

    vite -->|Genera HTML, JS y CSS| sitio
    sitio -->|Entrega la demo| interfaz
    admin -->|Opera la demo| interfaz
```

## Cómo funciona

- **Carga.** Vite genera los archivos de producción. El alojamiento estático los entrega y la aplicación recupera los registros disponibles en el navegador.
- **Operación.** La interfaz recibe las acciones del administrador. JavaScript valida el DNI único y las reglas de entrada y salida. La aplicación obtiene la hora del dispositivo, guarda el instante en UTC y calcula el día de asistencia en `America/Lima`.
- **Persistencia.** Los empleados y las marcaciones se guardan en `localStorage` del navegador. La aplicación confirma las escrituras exitosas y recupera los datos al recargar la demo en el mismo navegador.

[[Alcance-MVP|Alcance del MVP]] · [[Modelo-de-Datos|Modelo de datos]] · [[Requisitos-No-Funcionales|Requisitos no funcionales]].
