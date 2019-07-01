import { getQuarter } from 'date-fns';

import { GregorianCalendar } from './gregorian-calendar';
import { EthiopianCalendar } from './ethiopian-calender';

export class Calendar {
  constructor(calendarId) {
    this._calendarId = calendarId;
    this._calendar = {};

    this.getInstance();
  }

  getInstance() {
    switch (this._calendarId) {
      case 'ethiopian':
        this._calendar = new EthiopianCalendar();
        return this;
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

  getCurrentBiMonth() {
    return Math.ceil(this.getCurrentMonth() / 2);
  }

  getCurrentSixMonth() {
    return Math.ceil(this.getCurrentMonth() / 6);
  }

  getCurrentSixMonthApril() {
    const currentMonth = this.getCurrentMonth();

    return currentMonth >= 4 && currentMonth <= 9 ? 1 : 2;
  }
}
