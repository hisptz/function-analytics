import { PeriodUtil } from '../utilities/period-util';

export class PeriodResult {
  constructor(periodData) {
    this._period = periodData.period;
    this._calendarId = periodData.calendarId;
    this._preferences = periodData.preferences;
  }

  get id() {
    return (this._period.id || '').toString();
  }

  get name() {
    return this._period.name;
  }

  get type() {
    return this._period.type;
  }

  get dailyPeriods() {
    // TODO: Implement daily periods
    return PeriodUtil.getChildrenPeriods(
      this.id,
      this.type,
      'Daily',
      this._calendarId,
      this._preferences
    );
  }

  get weeklyPeriods() {
    // TODO: Implement weekly periods
    return PeriodUtil.getChildrenPeriods(
      this.id,
      this.type,
      'Weekly',
      this._calendarId,
      this._preferences
    );
  }

  get monthlyPeriods() {
    return PeriodUtil.getChildrenPeriods(
      this.id,
      this.type,
      'Monthly',
      this._calendarId,
      this._preferences
    );
  }

  get quarterlyPeriods() {
    return PeriodUtil.getChildrenPeriods(
      this.id,
      this.type,
      'Quarterly',
      this._calendarId,
      this._preferences
    );
  }
}
