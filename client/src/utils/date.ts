export function convertDateToBaseFormat(date: Date): string {
  const localDate = date.toLocaleDateString().split('.')
  return `${localDate[2]}-${localDate[1]}-${localDate[0]}`
}

export function getTimeWithCurrentTimeZone(time: string): string {
  const hourOffset = Math.floor(Math.abs(new Date().getTimezoneOffset()) / 60)
  const [h, m] = time.split(':')
  return `${+h + hourOffset}:${m}:00`
}

export default function getFormatDurationTime(
  duration: number,
  timeStrType: 'short' | 'long' = 'short'
): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  const hourStr = timeStrType === 'long' ? 'hour' : 'h'
  const minutesStr = timeStrType === 'long' ? 'minutes' : 'm'
  const timeStr = hours > 0 ? hourStr : minutesStr

  return `${hours}${minutes ? ':' + minutes : ''} ${timeStr}`
}
