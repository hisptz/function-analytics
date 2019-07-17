export class PeriodType {
  constructor() {
    this._validTypes = [
      'Monthly',
      'BiMonthly',
      'Quarterly',
      'SixMonthly',
      'SixMonthlyApril',
      'SixMonthlyNovember',
      'Yearly',
      'FinancialApril',
      'FinancialJuly',
      'FinancialOctober',
      'FinancialNovember',
      'RelativeWeek',
      'RelativeMonth',
      'RelativeBiMonth',
      'RelativeSixMonth',
      'RelativeQuarter',
      'RelativeYear',
      'RelativeFinancialYear'
    ];
  }

  isValid(type) {
    return this._validTypes.includes(type);
  }

  get() {
    return this._validTypes.map(periodType => {
      return {
        id: periodType,
        name: periodType
      };
    });
  }
}
