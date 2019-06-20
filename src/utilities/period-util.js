import { chunk, head, last, range } from 'lodash';

import { Calendar } from './calendars/calendar';

export class PeriodUtil {
  constructor(calendarId, type, preferences, year) {
    this._calendarId = calendarId || 'gregorian';
    this._type = type;
    this._preferences = preferences;
    this._periods = [];

    this._calendar = new Calendar(calendarId);

    if (!this._calendar) {
      throw new Error('Calendar could not be set');
    }

    this._year = year || this._calendar.getCurrentYear();
    this._month = this._calendar.getCurrentMonth();
    this._quarter = this._calendar.getCurrentQuarter();
    this._monthNames = this._calendar.getMonths();
  }

  get() {
    this._periods = this.getPeriods(this._type, this._year);
    return this._periods.reverse();
  }

  getPeriods(type, year) {
    let periods;

    switch (type) {
      case 'Monthly': {
        periods = this.getMonthlyPeriods(year);
        break;
      }

      case 'Quarterly': {
        periods = this.getQuarterlyPeriods(year);
        break;
      }

      case 'Yearly': {
        periods = this.getYearlyPeriods(year);
        break;
      }
      default:
        periods = [];
        break;
    }

    if (this._preferences && this._preferences.allowFuturePeriods) {
      return periods;
    }

    return this.omitFuturePeriods(periods, type);
  }

  deducePeriodType(periodId) {
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
  getMonthlyPeriods(year) {
    return (this._monthNames || []).map((monthName, monthIndex) => {
      const id = this.getMonthPeriodId(year, monthIndex + 1);

      return {
        id,
        type: 'Monthly',
        name: `${monthName} ${year}`,
        dailyPeriods: this.getChildrenPeriods(id, 'Monthly', 'Daily'),
        weeklyPeriods: this.getChildrenPeriods(id, 'Monthly', 'Weekly')
      };
    });
  }

  getQuarterlyPeriods(year) {
    return (chunk(this._monthNames || [], 3) || []).map(
      (quarterMonths, quarterIndex) => {
        const id = this.getQuarterPeriodId(year, quarterIndex + 1);

        return {
          id,
          type: 'Quarterly',
          name: `${[head(quarterMonths || []), last(quarterMonths || [])].join(
            ' - '
          )} ${year}`,
          dailyPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Weekly'),
          monthPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Monthly')
        };
      }
    );
  }

  getYearlyPeriods(year) {
    return range(10)
      .map(yearIndex => {
        const yearPeriod = (parseInt(year, 10) - yearIndex).toString();

        return {
          id: yearPeriod,
          type: 'Yearly',
          name: yearPeriod,
          dailyPeriods: this.getChildrenPeriods(yearPeriod, 'Yearly', 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(
            yearPeriod,
            'Yearly',
            'Weekly'
          ),
          monthPeriods: this.getChildrenPeriods(
            yearPeriod,
            'Yearly',
            'Monthly'
          ),
          quarterPeriods: this.getChildrenPeriods(
            yearPeriod,
            'Yearly',
            'Quarterly'
          )
        };
      })
      .reverse();
  }

  omitFuturePeriods(periods, type) {
    return periods.filter(period => period.id < this.getCurrentPeriodId(type));
  }

  getCurrentPeriodId(type) {
    switch (type) {
      case 'Monthly': {
        return this.getMonthPeriodId(this._year, this._month);
      }
      case 'Quarterly': {
        return this.getQuarterPeriodId(this._year, this._quarter);
      }

      case 'Yearly': {
        return this._year;
      }

      default:
        return undefined;
    }
  }

  getMonthPeriodId(year, monthNumber) {
    return (
      year + (monthNumber < 10 ? `0${monthNumber}` : monthNumber).toString()
    );
  }

  getQuarterPeriodId(year, quarterNumber) {
    return `${year}Q${quarterNumber}`;
  }

  getChildrenPeriods(parentId, parentType, childrenType) {
    switch (parentType) {
      case 'Yearly': {
        const year = parseInt(parentId.slice(0, 4), 10);

        if (!isNaN(year)) {
          return this.getPeriods(childrenType, year).reverse();
        }
        return undefined;
      }

      case 'Quarterly': {
        const year = parseInt(parentId.slice(0, 4), 10);

        if (!isNaN(year)) {
          switch (childrenType) {
            case 'Monthly': {
              const quarterNumber = parseInt(parentId.slice(-1), 10);

              const monthPeriods = this.getPeriods(childrenType, year);

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
