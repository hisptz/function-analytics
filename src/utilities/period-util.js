import { Calendar } from './calendar';

const _validTypes = [
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

export class PeriodUtil {
  /**
   * Check if period type is valid
   * @param {*} type
   */
  static isValid(type) {
    return _validTypes.includes(type);
  }

  static getPeriods(type, year, calenderId, preferences) {
    switch (type) {
      case 'Monthly': {
        return PeriodUtil.getMonthlyPeriods(year, calenderId, preferences);
      }
      default:
        return [];
    }
  }

  static getMonthlyPeriods(year, calendarId, preferences) {
    // TODO: Plan to support other calendar systems eg Ethiopian, Persian, Hijri etc
    const periods = (Calendar.getMonths(calendarId) || []).map(
      (monthName, monthIndex) => {
        return {
          id: PeriodUtil.getMonthPeriodId(year, monthIndex + 1),
          name: `${monthName} ${year}`
        };
      }
    );

    if (preferences && preferences.allowFuturePeriods) {
      return periods;
    }

    return PeriodUtil.omitFuturePeriods(periods, calendarId);
  }

  static omitFuturePeriods(periods, calendarId) {
    return periods.filter(
      period =>
        period.id <
        PeriodUtil.getMonthPeriodId(
          Calendar.getCurrentYear(calendarId),
          Calendar.getCurrentMonth(calendarId)
        )
    );
  }

  static getMonthPeriodId(year, monthNumber) {
    return (
      year + (monthNumber < 10 ? `0${monthNumber}` : monthNumber).toString()
    );
  }
}
