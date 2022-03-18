/**
 * Format a date and time string to a Date object
 * @param {string} dateString - date string formatted as `DD/MM/YYYY`
 * @param {string} timeString - time string formatted as `HH:mm:ss`
 * @returns {Date} `Date` object for the specified date and time
 */
export const formatDateAndTimeStringToDate = (
  dateString: string,
  timeString: string
): Date => {
  const date: Date = new Date()
  const day: number = parseInt(dateString.split('/')[0])
  const month: number = parseInt(dateString.split('/')[1]) - 1
  const year: number = parseInt(dateString.split('/')[2])
  const hours: number = parseInt(timeString.split(':')[0])
  const minutes: number = parseInt(timeString.split(':')[1])
  const seconds: number = parseInt(timeString.split(':')[2])
  const milliseconds: number = 0

  date.setUTCDate(day)
  date.setUTCMonth(month)
  date.setUTCFullYear(year)
  date.setUTCHours(hours, minutes, seconds, milliseconds)

  return date
}
