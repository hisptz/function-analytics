import { getQuarter, getMonth, getYear } from 'date-fns';
const calendarMonths = {
  gregorian: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
};

export class Calendar {
  static getMonths(calendarId = 'gregorian') {
    return calendarMonths[calendarId];
  }

  static getCurrentYear(calendarId = 'gregorian') {
    return getYear(new Date());
  }

  static getCurrentMonth(calendarId = 'gregorian') {
    return getMonth(new Date());
  }

  static getCurrentQuarter(calendarId = 'gregorian') {
    return getQuarter(new Date());
  }
}
