/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../../src/index';

chai.expect();

const expect = chai.expect;

let period;

describe('Given and instance of Period class', () => {
  before(() => {
    period = new Fn.Period();
  });

  it('should be instantiated', () => {
    expect(period).to.be.instanceOf(Fn.Period);
  });
});

describe('Geven I set period type', () => {
  before(() => {
    period.setType('Monthly');
  });

  it('should return set period type', () => {
    expect(period.type).to.be.equal('Monthly');
  });
});

describe('Given I set monthly period type', () => {
  let periodResult;

  before(() => {
    period.setType('Monthly').get();
    periodResult = period.list;
  });

  it('should return monthly period list for the current year', () => {
    expect(periodResult.length > 0).to.be.equal(true);
  });
});

// TODO: Test to check if period instance can return future periods provided preference is set to do so
// TODO: Test to check if period list returned matches the once anticipated given previous year is selected
// TODO: Test to check if period list returned matches the once anticipated given current year is selected

describe('Given I set quarterly period type', () => {
  let periodResult;

  before(() => {
    period.setType('Quarterly').get();
    periodResult = period.list;
  });

  it('should return quarterly period list for the current year', () => {
    expect(periodResult.length > 0).to.be.equal(true);
  });
});

describe('Given I set yearly period type', () => {
  let periodResult;

  before(() => {
    period.setType('Yearly').get();
    periodResult = period.list;

    // console.log(periodResult);
  });

  it('should return yearly period list listing 9 years excluding current', () => {
    expect(periodResult.length === 9).to.be.equal(true);
  });
});

// TODO: Write test to check if quarter period is selected then it should return valid number of months as children period
