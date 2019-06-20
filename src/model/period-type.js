export class PeriodType {
  constructor() {
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

  isValid(type) {
    return this._validTypes.includes(type);
  }

  get() {
    return this._validTypes;
  }
}
