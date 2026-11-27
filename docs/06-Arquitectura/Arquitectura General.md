# Arquitectura general

Registro de Asistencia es una demo web estática que se ejecuta en el navegador del administrador. La interfaz se diseña primero para celular y se adapta a escritorio. El administrador abre la demo sin iniciar sesión, da de alta al personal, busca empleados por nombre, marca entradas y salidas y consulta el historial. [[docs/06-Arquitectura/diagrama/Arquitectura General|Diagrama de arquitectura general]]

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| Interfaz | Usa React con JSX y CSS. Presenta el formulario de alta, la búsqueda por nombre con DNI en los resultados, las acciones de marcación y el historial por empleado. Muestra las confirmaciones y los errores. |
| Lógica de aplicación | Implementa en JavaScript las reglas de personal y asistencia. Valida el DNI único y el límite de una entrada y una salida por empleado y fecha de Lima. |
| Fecha y hora | Toma el instante del reloj del dispositivo al marcar. Representa el instante en UTC para su guardado y lo convierte a `America/Lima` para mostrar la fecha y hora con segundos y determinar el día de asistencia. |
| Persistencia local | Lee y escribe en `localStorage` el objeto JSON de la clave `registro-asistencia`, que contiene las listas de empleados y marcaciones. Recupera los datos al recargar la misma demo en el mismo navegador. |

La interfaz solicita operaciones a la lógica de aplicación. La lógica usa el reloj y el almacenamiento del navegador para validar y registrar cada acción. [[Modelo-de-Datos|Modelo de datos]] · [[Requisitos Funcionales|Requisitos funcionales]]

## Flujo de una marcación

1. El administrador encuentra al empleado por nombre, lo selecciona por su DNI y elige marcar entrada o salida.
2. La aplicación captura el instante y calcula su fecha en Lima. Comprueba que la operación sea válida para el DNI y la fecha calculada.
3. La aplicación prepara la marcación. Si se trata de una salida, la vincula con la entrada que cierra.
4. Guarda los datos en el navegador y confirma la operación. Si la escritura falla, informa el error y conserva lo que ya estaba guardado.
5. El historial se construye con las marcaciones guardadas. Una entrada sin salida queda incompleta al cambiar la fecha de Lima. El día cuenta como asistencia cuando tiene una entrada y su salida correspondiente en esa misma fecha. [[Requisitos Funcionales#RF-08 · Validar la asistencia por día|Asistencia por día]]

## Compilación y distribución

Vite compila la demo en archivos HTML, JavaScript y CSS. El alojamiento estático entrega esos archivos y el navegador ejecuta la aplicación. Los nombres, DNI y marcaciones permanecen en el almacenamiento local del navegador. [[Requisitos-No-Funcionales#RNF-03 · Compatibilidad y distribución|Distribución]] · [[Requisitos-No-Funcionales#RNF-07 · Privacidad de los datos|Privacidad de los datos]]
