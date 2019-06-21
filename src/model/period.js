import { PeriodUtil } from '../utilities/period-util';
import { PeriodType } from './period-type';

/**
 * @description
 * Period class offers capabilities to get periods for different period types
 */
export class Period {
  constructor() {
    this._calendarId = 'ethiopian';

    this._periodType = new PeriodType();

    if (!this._periodType) {
      throw new Error('Could not instantiate period type');
    }
  }

  /**
   * Set period type
   * @param {string} type
   */
  setType(type) {
    if (!this._periodType.isValid(type)) {
      throw new Error('Not a valid period type');
    }

    this._type = type;
    return this;
  }

  setYear(year) {
    this._year = year;
    return this;
  }

  setCalendar(calendarId) {
    this._calendarId = calendarId;
    return this;
  }

  setPreferences(preferences) {
    this._preferences = preferences;
    return this;
  }

  setPeriod(id) {}

  get() {
    if (this._type) {
      const periodInstance = new PeriodUtil(
        this._calendarId,
        this._type,
        this._preferences,
        this._year
      );

      this._periods = periodInstance.get();

      this._year = periodInstance.year();

      this._currentYear = periodInstance.currentYear();
    }
    return this;
  }

  type() {
    return this._type;
  }

  list() {
    return this._periods;
  }

  year() {
    return this._year;
  }

  currentYear() {
    return this._currentYear;
  }
}
