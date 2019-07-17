export class PeriodType {
  constructor() {
    this._periodTypes = [
      { id: 'Monthly', name: 'Monthly', rank: 3 },
      { id: 'BiMonthly', name: 'BiMonthly', rank: 4 },
      { id: 'Quarterly', name: 'Quarterly', rank: 5 },
      { id: 'SixMonthly', name: 'SixMonthly', rank: 6 },
      { id: 'SixMonthlyApril', name: 'SixMonthlyApril', rank: 6 },
      { id: 'SixMonthlyNovember', name: 'SixMonthlyNovember', rank: 6 },
      { id: 'Yearly', name: 'Yearly', rank: 7 },
      { id: 'FinancialApril', name: 'FinancialApril', rank: 7 },
      { id: 'FinancialJuly', name: 'FinancialJuly', rank: 7 },
      { id: 'FinancialOctober', name: 'FinancialOctober', rank: 7 },
      { id: 'FinancialNovember', name: 'FinancialNovember', rank: 7 },
      { id: 'RelativeWeek', name: 'RelativeWeek', rank: 2 },
      { id: 'RelativeMonth', name: 'RelativeMonth', rank: 3 },
      { id: 'RelativeBiMonth', name: 'RelativeBiMonth', rank: 3 },
      { id: 'RelativeSixMonth', name: 'RelativeSixMonth', rank: 6 },
      { id: 'RelativeQuarter', name: 'RelativeQuarter', rank: 5 },
      { id: 'RelativeYear', name: 'RelativeYear', rank: 7 },
      { id: 'RelativeFinancialYear', name: 'RelativeFinancialYear', rank: 7 }
    ];

    this._validTypes = this._periodTypes.map(periodType => periodType.id);
  }

  isValid(type) {
    return this._validTypes.includes(type);
  }

  get() {
    return this._periodTypes;
  }
}
