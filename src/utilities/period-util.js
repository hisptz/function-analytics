import { Calendar } from './calendar';
import { chunk, head, last } from 'lodash';

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

  static getPeriods(type, year, calendarId, preferences) {
    let periods;

    switch (type) {
      case 'Monthly': {
        periods = PeriodUtil.getMonthlyPeriods(year, calendarId);
        break;
      }

      case 'Quarterly': {
        periods = PeriodUtil.getQuarterlyPeriods(year, calendarId);
        break;
      }
      default:
        periods = [];
        break;
    }

    if (preferences && preferences.allowFuturePeriods) {
      return periods;
    }

    return PeriodUtil.omitFuturePeriods(periods, type, calendarId);
  }

  static getMonthlyPeriods(year, calendarId) {
    // TODO: Plan to support other calendar systems eg Ethiopian, Persian, Hijri etc
    return (Calendar.getMonths(calendarId) || []).map(
      (monthName, monthIndex) => {
        return {
          id: PeriodUtil.getMonthPeriodId(year, monthIndex + 1),
          name: `${monthName} ${year}`
        };
      }
    );
  }

  static getQuarterlyPeriods(year, calendarId) {
    // TODO: Plan to support other calendar systems eg Ethiopian, Persian, Hijri etc
    return (chunk(Calendar.getMonths(calendarId), 3) || []).map(
      (quarterMonths, quarterIndex) => {
        return {
          id: PeriodUtil.getQuarterPeriodId(year, quarterIndex + 1),
          name: `${[head(quarterMonths || []), last(quarterMonths || [])].join(
            ' - '
          )} ${year}`
        };
      }
    );
  }

  static omitFuturePeriods(periods, type, calendarId) {
    return periods.filter(
      period => period.id < PeriodUtil.getCurrentPeriodId(type, calendarId)
    );
  }

  static getCurrentPeriodId(type, calendarId) {
    switch (type) {
      case 'Monthly': {
        return PeriodUtil.getMonthPeriodId(
          Calendar.getCurrentYear(calendarId),
          Calendar.getCurrentMonth(calendarId)
        );
      }
      case 'Quarterly': {
        return PeriodUtil.getQuarterPeriodId(
          Calendar.getCurrentYear(calendarId),
          Calendar.getCurrentQuarter(calendarId)
        );
      }
      default:
        return undefined;
    }
  }

  static getMonthPeriodId(year, monthNumber) {
    return (
      year + (monthNumber < 10 ? `0${monthNumber}` : monthNumber).toString()
    );
  }

  static getQuarterPeriodId(year, quarterNumber) {
    return `${year}Q${quarterNumber}`;
  }
}
