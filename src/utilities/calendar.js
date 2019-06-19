import { getQuarter, getMonth, getYear } from 'date-fns';
import { GregorianCalendar } from './gregorian-calendar';
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
    this._calendar = {};

    this.getInstance();
  }

  getInstance() {
    switch (this.calendarId) {
      default:
        this._calendar = new GregorianCalendar();

        if (!this._calendar) {
          throw new Error('Calendar could not be instantiated');
        }

        return this;
    }
  }

  getMonths() {
    return this._calendar.monthNames();
  }

  getCurrentYear() {
    return this._calendar.today().year();
  }

  getCurrentMonth() {
    return this._calendar.today().month();
  }

  getCurrentQuarter() {
    return getQuarter(this._calendar.today());
  }
}
