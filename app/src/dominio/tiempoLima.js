const formatoLima = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'America/Lima',
  calendar: 'gregory',
  numberingSystem: 'latn',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

export function fechaHoraLima(instante) {
  const { year, month, day, hour, minute, second } = Object.fromEntries(
    formatoLima.formatToParts(instante).map(({ type, value }) => [type, value]),
  )
  return { fecha: `${year}-${month}-${day}`, hora: `${hour}:${minute}:${second}` }
}
