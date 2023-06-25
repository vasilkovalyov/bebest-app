export function convertDateToBaseFormat(date: Date): string {
  const localDate = date.toLocaleDateString().split('.')
  return `${localDate[2]}-${localDate[1]}-${localDate[0]}`
}

export function getTimeWithCurrentTimeZone(time: string): string {
  const hourOffset = Math.floor(Math.abs(new Date().getTimezoneOffset()) / 60)
  const [h, m] = time.split(':')
  return `${+h + hourOffset}:${m}:00`
}
