export class ErrorAltaEmpleado extends Error {
  constructor(campo, mensaje) {
    super(mensaje)
    this.campo = campo
  }
}

export function darDeAltaEmpleado(registro, campos) {
  const nombre = campos.nombre.trim()
  const dni = campos.dni.trim()

  if (!nombre) {
    throw new ErrorAltaEmpleado('nombre', 'Ingresa el nombre del empleado.')
  }
  if (!dni) {
    throw new ErrorAltaEmpleado('dni', 'Ingresa el DNI del empleado.')
  }
  if (registro.empleados.some(empleado => empleado.dni.trim() === dni)) {
    throw new ErrorAltaEmpleado('dni', 'Ese DNI ya está registrado.')
  }

  return { ...registro, empleados: [...registro.empleados, { nombre, dni }] }
}

function normalizarBusqueda(texto) {
  return texto.trim().toLocaleLowerCase('es-PE').normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function buscarEmpleados(empleados, consulta) {
  const nombreBuscado = normalizarBusqueda(consulta)
  return empleados.filter(empleado => normalizarBusqueda(empleado.nombre).includes(nombreBuscado))
}
