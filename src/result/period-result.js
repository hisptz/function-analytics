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
    return this._period.dailyPeriods;
  }

  get weeklyPeriods() {
    return this._period.weeklyPeriods;
  }

  get monthlyPeriods() {
    return this._period.monthlyPeriods;
  }

  get quarterlyPeriods() {
    return this._period.quarterlyPeriods;
  }
}
