import { formatDateAndTimeStringToDate } from '@services/formatDate'

describe('Testing "formatDateAndTimeStringToDate" method from "formatDate" module', () => {
  test('Should return a date ISO string with the same given date and time', () => {
    const dateString = '10/12/2022' // formatted as DD/MM/YYYY
    const timeString = '23:32:45' // formatted as HH:mm:ss
    const expectedIsoString = '2022-12-10T23:32:45.000Z'
    const date = formatDateAndTimeStringToDate(dateString, timeString)
    const isoString = date.toISOString()
    expect(isoString).toBe(expectedIsoString)
  })
})
