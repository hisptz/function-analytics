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
  constructor(calendarId) {
    this._calendarId = calendarId;
  }

  getMonths() {
    return calendarMonths[this._calendarId];
  }

  getCurrentYear() {
    return getYear(new Date());
  }

  getCurrentMonth() {
    return getMonth(new Date());
  }

  getCurrentQuarter() {
    return getQuarter(new Date());
  }
}
