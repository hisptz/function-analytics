import { PeriodUtil } from '../utilities/period-util';

/**
 * @description
 * Period class offers capabilities to get periods for different period types
 */
export class Period {
  constructor() {
    // TODO: Need to fetch system period type from server
    this._calendarId = 'ethiopian';
    this._validTypes = [
      'Monthly',
      'BiMonthly',
      'Quarterly',
      'SixMonthly',
      'SixMonthlyApril',
      'Yearly',
      'FinancialApril',
      'FinancialJuly',
      'FinancialOctober',
      'RelativeWeek',
      'RelativeMonth',
      'RelativeBiMonth',
      'RelativeQuarter',
      'RelativeYear',
      'RelativeFinancialYear'
    ];
  }

  /**
   * Set period type
   * @param {string} type
   */
  setType(type) {
    if (!this._isValid(type)) {
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
    // TODO: Support to fetch list for default period type if not set
    if (this._type) {
      const periodInstance = new PeriodUtil(
        this._calendarId,
        this._type,
        this._preferences,
        this._year
      );

      this._periods = periodInstance.get();
    }
    return this;
  }

  get type() {
    return this._type;
  }

  get list() {
    return this._periods;
  }

  _isValid(type) {
    return this._validTypes.includes(type);
  }
}
