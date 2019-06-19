import { Calendar } from './calendar';
import { chunk, head, last, range } from 'lodash';
import { GregorianCalendar } from './gregorian-calendar';
import $ from 'jquery';

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
    const greg = new GregorianCalendar();

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

      case 'Yearly': {
        periods = PeriodUtil.getYearlyPeriods(year);
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

  static deducePeriodType(periodId) {
    let periodType;

    const numberLikePeriod = parseInt(periodId, 10);

    // Find if selected period id has type of yearly yearly
    if (!isNaN(numberLikePeriod)) {
      if (periodId.length === 4) {
        periodType = 'Yearly';
      } else if (periodId.indexOf('B') !== -1) {
        periodType = 'BiMonthly';
      } else if (periodId.indexOf('Q') !== -1) {
        periodType = 'Quarterly';
      } else if (periodId.indexOf('AprilS') !== -1) {
        periodType = 'SixMonthlyApril';
      } else if (periodId.indexOf('April') !== -1) {
        periodType = 'FinancialApril';
      } else if (periodId.indexOf('S') !== -1) {
        periodType = 'SixMonthly';
      } else if (periodId.indexOf('July') !== -1) {
        periodType = 'FinancialJuly';
      } else if (periodId.indexOf('Oct') !== -1) {
        periodType = 'FinancialOctober';
      } else {
        periodType = 'Monthly';
      }
    } else {
      if (periodId.indexOf('QUARTER') !== -1) {
        periodType = 'RelativeQuarter';
      } else if (periodId.indexOf('WEEK') !== -1) {
        periodType = 'RelativeWeek';
      } else if (periodId.indexOf('MONTH') !== -1) {
        if (periodId.indexOf('BIMONTH') !== -1) {
          periodType = 'RelativeBiMonth';
        } else if (periodId.indexOf('SIX_MONTH') !== -1) {
          periodType = 'RelativeSixMonth';
        } else {
          periodType = 'RelativeMonth';
        }
      } else if (periodId.indexOf('YEAR') !== -1) {
        if (periodId.indexOf('FINANCIAL_YEAR') !== -1) {
          periodType = 'RelativeFinancialYear';
        } else {
          periodType = 'RelativeYear';
        }
      }
    }

    return periodType;
  }
  static getMonthlyPeriods(year, calendarId) {
    // TODO: Plan to support other calendar systems eg Ethiopian, Persian, Hijri etc
    return (Calendar.getMonths(calendarId) || []).map(
      (monthName, monthIndex) => {
        return {
          id: PeriodUtil.getMonthPeriodId(year, monthIndex + 1),
          type: 'Monthly',
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
          type: 'Quarterly',
          name: `${[head(quarterMonths || []), last(quarterMonths || [])].join(
            ' - '
          )} ${year}`
        };
      }
    );
  }

  static getYearlyPeriods(year) {
    // TODO: Plan to support other calendar systems eg Ethiopian, Persian, Hijri etc
    return range(10)
      .map(yearIndex => {
        const yearPeriod = parseInt(year, 10) - yearIndex;

        return {
          id: yearPeriod,
          type: 'Yearly',
          name: yearPeriod
        };
      })
      .reverse();
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

      case 'Yearly': {
        return Calendar.getCurrentYear();
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

  static getChildrenPeriods(
    parentId,
    parentType,
    childrenType,
    calendarId,
    preferences
  ) {
    switch (parentType) {
      case 'Yearly': {
        const year = parseInt(parentId.slice(0, 4), 10);

        if (!isNaN(year)) {
          return PeriodUtil.getPeriods(
            childrenType,
            year,
            calendarId,
            preferences
          ).reverse();
        }
        return undefined;
      }

      case 'Quarterly': {
        const year = parseInt(parentId.slice(0, 4), 10);

        if (!isNaN(year)) {
          switch (childrenType) {
            case 'Monthly': {
              const quarterNumber = parseInt(parentId.slice(-1), 10);

              const monthPeriods = PeriodUtil.getPeriods(
                childrenType,
                year,
                calendarId,
                preferences
              );

              return (monthPeriods || [])
                .filter(
                  (period, periodIndex) => periodIndex < quarterNumber * 3
                )
                .reverse();
            }

            default:
              return undefined;
          }
        }

        return undefined;
      }
      default:
        return undefined;
    }
  }
}
