interface IMonthNumber {
  count: number
  title: string
}

export function getMonthsNumbers(): IMonthNumber[] {
  let months: IMonthNumber[] = []
  const monthsNumArray = Array.from(Array(12).keys())

  for (let key of monthsNumArray) {
    months.push({
      count: key + 1,
      title: `${key + 1} ${key + 1 === 1 ? 'month' : 'months'}`,
    })
  }
  return months
}
