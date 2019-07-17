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
    this._sixMonth = this._calendar.getCurrentSixMonth();
    this._sixmonthApril = this._calendar.getCurrentSixMonthApril();
    this._sixMonthNovember = this._calendar.getCurrentSixMonthNovember();
    this._monthNames = this._calendar.getMonths();
    this._quarterMonthOffset = this._calendar.getQuarterMonthOffset();
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

  getPeriods(type, year, offset = 0) {
    let periods;

    switch (type) {
      case 'Monthly': {
        periods = this.getMonthlyPeriods(year, offset);
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

      case 'SixMonthlyApril': {
        periods = this.getSixMonthlyAprilPeriods(year);
        break;
      }

      case 'SixMonthlyNovember': {
        periods = this.getSixMonthlyNovemberPeriods(year);
        break;
      }

      case 'Yearly': {
        periods = this.getYearlyPeriods(year, 'Yearly');
        break;
      }

      case 'FinancialApril': {
        periods = this.getYearlyPeriods(year, 'FinancialApril');
        break;
      }

      case 'FinancialJuly': {
        periods = this.getYearlyPeriods(year, 'FinancialJuly');
        break;
      }

      case 'FinancialOctober': {
        periods = this.getYearlyPeriods(year, 'FinancialOctober');
        break;
      }

      case 'FinancialNovember': {
        periods = this.getYearlyPeriods(year, 'FinancialNovember');
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
  getMonthlyPeriods(year, offset = 0) {
    const monthPeriods = (this._monthNames || []).map(
      (monthName, monthIndex) => {
        const monthOffset = monthIndex + 1 - this._quarterMonthOffset;
        const monthYear = monthOffset > 12 ? year - 1 : year;
        const id = this.getMonthPeriodId(monthYear, monthIndex + 1);

        return {
          id,
          type: 'Monthly',
          name: `${monthName} ${monthYear}`,
          dailyPeriods: this.getChildrenPeriods(id, 'Monthly', 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(id, 'Monthly', 'Weekly')
        };
      }
    );

    return this.getMonthsByOffset(monthPeriods, offset);
  }

  getQuarterlyPeriods(year) {
    return chunk(
      this.getMonthsByOffset(
        this.getMonthWithYears(
          this._monthNames,
          year,
          this._quarterMonthOffset
        ),
        this._quarterMonthOffset
      ),
      3
    ).map((quarterMonths, quarterIndex) => {
      const id = this.getQuarterPeriodId(year, quarterIndex + 1);
      const startMonth = head(quarterMonths || []);
      const endMonth = last(quarterMonths || []);

      return {
        id,
        type: 'Quarterly',
        name: this.getPeriodNameByRange(startMonth, endMonth, year),
        dailyPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Daily'),
        weeklyPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Weekly'),
        monthPeriods: this.getChildrenPeriods(id, 'Quarterly', 'Monthly')
      };
    });
  }

  getPeriodNameByRange(startMonth, endMonth, year) {
    return `${[startMonth.name + ` ${startMonth.year}`, endMonth.name].join(
      ' - '
    )} ${endMonth.year}`;
  }

  getMonthsByOffset(months, offset) {
    return [
      ...months.slice(offset),
      ...months.slice(0, months.length + offset)
    ];
  }

  getMonthWithYears(monthNames, year, offset) {
    return (monthNames || []).map((name, index) => {
      const monthOffset = index + 1 - offset;

      return { name, index, year: monthOffset > 12 ? year - 1 : year };
    });
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

  getSixMonthlyAprilPeriods(year) {
    const months = this.getMonthWithYears(this._monthNames, year + 1, -9);

    return (
      chunk([...months.slice(3), ...months.slice(0, 3)] || [], 6) || []
    ).map((sixMonthApril, sixMonthAprilIndex) => {
      const id = this.getSixMonthlyPeriodId(
        year,
        sixMonthAprilIndex + 1,
        'April'
      );

      return {
        id,
        type: 'SixMonthlyApril',
        name: this.getPeriodNameByRange(
          head(sixMonthApril || []),
          last(sixMonthApril || []),
          year
        ),
        dailyPeriods: this.getChildrenPeriods(id, 'SixMonthlyApril', 'Daily'),
        weeklyPeriods: this.getChildrenPeriods(id, 'SixMonthlyApril', 'Weekly'),
        monthPeriods: this.getChildrenPeriods(id, 'SixMonthlyApril', 'Monthly')
      };
    });
  }

  getSixMonthlyNovemberPeriods(year) {
    return chunk(
      this.getMonthsByOffset(
        this.getMonthWithYears(this._monthNames, year, -2),
        this._quarterMonthOffset
      ),
      6
    ).map((sixMonthNovember, sixMonthNovemberIndex) => {
      const id = this.getSixMonthlyPeriodId(
        year,
        sixMonthNovemberIndex + 1,
        'Nov'
      );

      return {
        id,
        type: 'SixMonthlyNovember',
        name: this.getPeriodNameByRange(
          head(sixMonthNovember || []),
          last(sixMonthNovember || []),
          year
        ),
        dailyPeriods: this.getChildrenPeriods(
          id,
          'SixMonthlyNovember',
          'Daily'
        ),
        weeklyPeriods: this.getChildrenPeriods(
          id,
          'SixMonthlyNovember',
          'Weekly'
        ),
        monthPeriods: this.getChildrenPeriods(
          id,
          'SixMonthlyNovember',
          'Monthly'
        )
      };
    });
  }

  getYearlyPeriods(year, type) {
    return range(10)
      .map(yearIndex => {
        const periodYear = parseInt(year, 10) - yearIndex;
        const id = this.getYearlyPeriodId(periodYear, type);
        const name = this.getYearlyPeriodName(periodYear, type);

        return {
          id,
          type,
          name,
          dailyPeriods: this.getChildrenPeriods(id, type, 'Daily'),
          weeklyPeriods: this.getChildrenPeriods(id, type, 'Weekly'),
          monthPeriods: this.getChildrenPeriods(id, type, 'Monthly'),
          quarterPeriods: this.getChildrenPeriods(id, type, 'Quarterly')
        };
      })
      .reverse();
  }

  omitFuturePeriods(periods, type) {
    const currentPeriodId = this.getCurrentPeriodId(type);

    return periods.filter(period => period.id < currentPeriodId);
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
          this._biMonth
        );
      }

      case 'SixMonthly': {
        return this.getSixMonthlyPeriodId(
          this._calendar.getCurrentYear(),
          this._sixMonth
        );
      }

      case 'SixMonthlyApril': {
        return this.getSixMonthlyPeriodId(
          this._calendar.getCurrentYear(),
          this._sixmonthApril,
          'April'
        );
      }

      case 'SixMonthlyNovember': {
        return this.getSixMonthlyPeriodId(
          this._calendar.getCurrentYear(),
          this._sixMonthNovember,
          'Nov'
        );
      }

      case 'Yearly': {
        return this._calendar.getCurrentYear();
      }

      case 'FinancialApril': {
        const currentYear = this._calendar.getCurrentYear();

        return this.getYearlyPeriodId(
          this._month >= 4 ? currentYear : currentYear - 1,
          'FinancialApril'
        );
      }

      case 'FinancialJuly': {
        const currentYear = this._calendar.getCurrentYear();

        return this.getYearlyPeriodId(
          this._month >= 7 ? currentYear : currentYear - 1,
          'FinancialJuly'
        );
      }

      case 'FinancialOctober': {
        const currentYear = this._calendar.getCurrentYear();

        return this.getYearlyPeriodId(
          this._month >= 10 ? currentYear : currentYear - 1,
          'FinancialOctober'
        );
      }

      case 'FinancialNovember': {
        const currentYear = this._calendar.getCurrentYear();

        return this.getYearlyPeriodId(
          this._month >= 11 ? currentYear : currentYear - 1,
          'FinancialNovember'
        );
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

  getSixMonthlyPeriodId(year, sixMonthNumber, sixMonthType = '') {
    return `${year}${sixMonthType}S${sixMonthNumber}`;
  }

  getYearlyPeriodId(year, type) {
    switch (type) {
      case 'FinancialApril': {
        return `${year}April`;
      }
      case 'FinancialJuly': {
        return `${year}July`;
      }
      case 'FinancialOctober': {
        return `${year}Oct`;
      }

      case 'FinancialNovember': {
        return `${year}Nov`;
      }

      default:
        return year.toString();
    }
  }

  getYearlyPeriodName(year, type) {
    switch (type) {
      case 'FinancialApril': {
        return `${this._monthNames[3]} ${year} - ${this._monthNames[2]} ${year +
          1}`;
      }
      case 'FinancialJuly': {
        return `${this._monthNames[6]} ${year} - ${this._monthNames[5]} ${year +
          1}`;
      }
      case 'FinancialOctober': {
        return `${this._monthNames[9]} ${year} - ${this._monthNames[8]} ${year +
          1}`;
      }

      case 'FinancialNovember': {
        return `${this._monthNames[10]} ${year} - ${
          this._monthNames[9]
        } ${year + 1}`;
      }

      default:
        return year.toString();
    }
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

              const monthPeriods = this.getPeriods(
                childrenType,
                year,
                this._quarterMonthOffset
              );

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
