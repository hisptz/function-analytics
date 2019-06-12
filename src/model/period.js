import { PeriodUtil } from '../utilities/period-util';
import { Calendar } from '../utilities/calendar';
import { PeriodResult } from '../result/period-result';
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

  setPeriod(id) {}

  get() {
    if (this._type) {
      this._periods = PeriodUtil.getPeriods(
        this._type,
        this._year || Calendar.getCurrentYear(this._calendarId),
        this._calendarId,
        this._preferences
      ).reverse();
    }
  }

  get type() {
    return this._type;
  }

  get list() {
    return this._periods.map(
      period =>
        new PeriodResult({
          period,
          calendarId: this._calendarId,
          preferences: this._preferences
        })
    );
  }
}
