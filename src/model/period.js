import { PeriodUtil } from '../utilities/period-util';
/**
 * @description
 * Period class offers capabilities to get periods for different period types
 */
export class Period {
  constructor() {
    // TODO: Need to fetch system period type from server
    this._calendarId = 'gregorian';
  }

  /**
   * Set period type
   * @param {string} type
   */
  setType(type) {
    if (!PeriodUtil.isValid(type)) {
      throw new Error('Not a valid period type');
    }

    this._type = type;
    return this;
  }

  setYear(year) {
    this._year = year;
    return this;
  }

  setPreferences(preferences) {
    this._preferences = preferences;
    return this;
  }

  get() {
    if (this._type) {
      const date = new Date();
      const year = this._year || date.getFullYear();

      this._periods = PeriodUtil.getPeriods(
        this._type,
        year,
        this._calendarId,
        this._preferences
      ).reverse();
    }
    return this;
  }

  get type() {
    return this._type;
  }

  get list() {
    return this._periods;
  }
}
