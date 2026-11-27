# Estructura del proyecto

La documentación del MVP está en `docs/`. La estructura propuesta ubica la demo React y Vite en `app/`, con su propio archivo de entrada y sus dependencias. [[docs/06-Arquitectura/Arquitectura General|Arquitectura general]]

## Carpetas y archivos

```text
Registro de Asistencia/
├── docs/
│   ├── 00-Inicio/
│   ├── 01-Usuarios/
│   ├── 02-Requisitos/
│   ├── 03-Alcance/
│   ├── 04-Casos-de-uso/
│   ├── 05-Datos/
│   └── 06-Arquitectura/
└── app/                         (estructura propuesta)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── navegacion.js
        ├── useCamara.js
        ├── estilos.css
        ├── componentes/
        │   ├── BarraLateral.jsx
        │   ├── FormularioEmpleado.jsx
        │   ├── BusquedaEmpleados.jsx
        │   ├── SelectorEmpleado.jsx
        │   ├── AccionesMarcacion.jsx
        │   ├── FotoMarcacion.jsx
        │   └── HistorialEmpleado.jsx
        ├── dominio/
        │   ├── empleados.js
        │   ├── asistencia.js
        │   └── tiempoLima.js
        └── datos/
            ├── fotosLocal.js
            └── registroLocal.js
```

## Responsabilidad de cada parte

| Ruta | Contenido |
| --- | --- |
| `app/index.html` y `app/src/main.jsx` | Entrada HTML y montaje de React. |
| `app/package.json` y `app/vite.config.js` | Dependencias, comandos de desarrollo y configuración de Vite para React. |
| `app/src/App.jsx` | Coordina la vista activa, la carga del registro, la selección del empleado por DNI y las operaciones de guardado. |
| `app/src/navegacion.js` | Define las tres vistas y obtiene la sección activa del fragmento de la URL. |
| `app/src/useCamara.js` | Abre y libera la cámara, cambia su orientación y captura una imagen al marcar. |
| `app/src/componentes/` | Barra lateral, formulario de alta, listado de personal, búsqueda por nombre, acciones de marcación e historial del empleado. |
| `app/src/dominio/` | Reglas del DNI y las marcaciones. `tiempoLima.js` deriva la fecha y hora en `America/Lima` a partir del instante registrado en UTC. |
| `app/src/datos/registroLocal.js` | Carga y guarda el JSON de empleados y marcaciones en la clave `registro-asistencia` de `localStorage`. |
| `app/src/datos/fotosLocal.js` | Guarda y consulta en IndexedDB las fotos opcionales asociadas a una marcación. |
| `app/src/estilos.css` | Estilos base para celular y ajustes para pantallas más amplias. |

Los componentes reciben los datos y comunican las acciones del administrador a `App.jsx`. Para un alta o una marcación, `App.jsx` aplica las reglas de dominio, solicita el guardado y actualiza la vista después de confirmarlo. [[Modelo-de-Datos|Modelo de datos]]

## Desarrollo y compilación

Desde `app/`, `npm run dev` iniciará el entorno de desarrollo y `npm run build` generará los archivos estáticos en `app/dist/`. [[Requisitos-No-Funcionales#RNF-03 · Compatibilidad y distribución|Compatibilidad y distribución]]
