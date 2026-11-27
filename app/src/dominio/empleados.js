export class ErrorAltaEmpleado extends Error {
  constructor(campo, mensaje) {
    super(mensaje)
    this.campo = campo
  }
}

function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : ''
}

export function nombreCompleto(empleado) {
  const nombres = texto(empleado.nombres)
  const apellidos = texto(empleado.apellidos)
  return nombres && apellidos ? `${nombres} ${apellidos}` : texto(empleado.nombre)
}

export function darDeAltaEmpleado(registro, campos) {
  const nombres = texto(campos.nombres)
  const apellidos = texto(campos.apellidos)
  const dni = texto(campos.dni)
  const puesto = texto(campos.puesto)

  if (!nombres) {
    throw new ErrorAltaEmpleado('nombres', 'Ingresa los nombres del empleado.')
  }
  if (!apellidos) {
    throw new ErrorAltaEmpleado('apellidos', 'Ingresa los apellidos del empleado.')
  }
  if (!dni) {
    throw new ErrorAltaEmpleado('dni', 'Ingresa el DNI del empleado.')
  }
  if (registro.empleados.some(empleado => empleado.dni.trim() === dni)) {
    throw new ErrorAltaEmpleado('dni', 'Ese DNI ya está registrado.')
  }

  const empleado = { dni, nombres, apellidos }
  if (puesto) empleado.puesto = puesto
  return { ...registro, empleados: [...registro.empleados, empleado] }
}

function normalizarBusqueda(texto) {
  return texto.trim().toLocaleLowerCase('es-PE').normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function buscarEmpleados(empleados, consulta) {
  const nombreBuscado = normalizarBusqueda(consulta)
  return empleados.filter(empleado => normalizarBusqueda(nombreCompleto(empleado)).includes(nombreBuscado))
}
