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
    this._biMonth = this._calendar.getCurrentBiMonth();
    this._sixmonth = this._calendar.getCurrentSixMonth();

    const monthsNames = this._calendar.getMonths();

    this._monthNames =
      monthsNames.length === 13 ? monthsNames.slice(0, -1) : monthsNames;
  }

  get() {
    this._periods = this.getPeriods(this._type, this._year);
    return this._periods.reverse();
  }

  year() {
    return this._year;
  }

  currentYear() {
    return this._calendar.getCurrentYear();
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

      case 'BiMonthly': {
        periods = this.getBiMonthlyPeriods(year);
        break;
      }

      case 'SixMonthly': {
        periods = this.getSixMonthlyPeriods(year);
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

  getBiMonthlyPeriods(year) {
    return (chunk(this._monthNames || [], 2) || []).map(
      (biMonths, biMonthIndex) => {
        const id = this.getBiMonthlyPeriodId(year, biMonthIndex + 1);

        return {
          id,
          type: 'BiMonthly',
          name: `${[head(biMonths || []), last(biMonths || [])].join(
            ' - '
          )} ${year}`,
          dailyPeriods: this.getChildrenPeriods(id, 'BiMonthly', 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(id, 'BiMonthly', 'Weekly'),
          monthPeriods: this.getChildrenPeriods(id, 'BiMonthly', 'Monthly')
        };
      }
    );
  }

  getSixMonthlyPeriods(year) {
    return (chunk(this._monthNames || [], 6) || []).map(
      (sixMonths, sixMonthIndex) => {
        const id = this.getSixMonthlyPeriodId(year, sixMonthIndex + 1);

        return {
          id,
          type: 'SixMonthly',
          name: `${[head(sixMonths || []), last(sixMonths || [])].join(
            ' - '
          )} ${year}`,
          dailyPeriods: this.getChildrenPeriods(id, 'SixMonthly', 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(id, 'SixMonthly', 'Weekly'),
          monthPeriods: this.getChildrenPeriods(id, 'SixMonthly', 'Monthly')
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

  getCurrentPeriodId(type, useCurrentYear = false) {
    switch (type) {
      case 'Monthly': {
        return this.getMonthPeriodId(
          this._calendar.getCurrentYear(),
          this._month
        );
      }
      case 'Quarterly': {
        return this.getQuarterPeriodId(
          this._calendar.getCurrentYear(),
          this._quarter
        );
      }

      case 'BiMonthly': {
        return this.getBiMonthlyPeriodId(
          this._calendar.getCurrentYear(),
          this._bimonth
        );
      }

      case 'SixMonthly': {
        return this.getSixMonthlyPeriodId(
          this._calendar.getCurrentYear(),
          this._sixmonth
        );
      }

      case 'Yearly': {
        return this._calendar.getCurrentYear();
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

  getBiMonthlyPeriodId(year, biMonthNumber) {
    return `${year}0${biMonthNumber}B`;
  }

  getSixMonthlyPeriodId(year, sixMonthNumber) {
    return `${year}S${sixMonthNumber}`;
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
                .filter((period, periodIndex) => {
                  const max = quarterNumber * 3;
                  const min = max - 3;

                  return periodIndex >= min && periodIndex < max;
                })
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
