# Registro de Asistencia

Proyecto de una demo web para dar de alta al personal, registrar entradas y salidas y consultar el historial de asistencia. El administrador buscará por nombre, identificará a cada empleado por su DNI y registrará las marcaciones con la fecha y hora de Lima.

La aplicación se plantea como un sitio estático con React, JavaScript, CSS y Vite. El diseño prioriza el celular y conserva los registros en el navegador mediante `localStorage`.

## Desarrollo local

La base de la interfaz se ejecuta con Node.js 20.19+ dentro de la serie 20, o con Node.js 22.12 o posterior.

```sh
cd app
npm ci
npm run dev
```

`npm run build` genera los archivos estáticos en `app/dist/`. `npm run preview` permite revisar esa compilación en el navegador.

## Documentación del MVP

- [Alcance y criterios de aceptación](docs/03-Alcance/Alcance-MVP.md)
- [Requisitos funcionales](docs/02-Requisitos/Requisitos%20Funcionales.md) y [no funcionales](docs/02-Requisitos/Requisitos-No-Funcionales.md)
- [Historias de usuario](docs/04-Casos-de-uso/Historias-de-Usuario.md)
- [Modelo de datos](docs/05-Datos/Modelo-de-Datos.md)
- [Arquitectura general](docs/06-Arquitectura/Arquitectura%20General.md) y [flujos](docs/06-Arquitectura/Flujos.md)
