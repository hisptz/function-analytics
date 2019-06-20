/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../../src/index';

chai.expect();

const expect = chai.expect;

let periodType;

describe('Given an instance of Period type class', () => {
  before(() => {
    periodType = new Fn.PeriodType();
  });

  it('should be instantiated', () => {
    expect(periodType).to.be.instanceOf(Fn.PeriodType);
  });
});

describe('Given I have a valid period type', () => {
  let isValid;

  before(() => {
    isValid = periodType.isValid('Monthly');
  });

  it('should return true if period type is valid', () => {
    expect(isValid).to.be.equal(true);
  });
});

describe('Given I have invalid period type', () => {
  let isValid;

  before(() => {
    isValid = periodType.isValid('Month');
  });

  it('should return false if period type is not valid', () => {
    expect(isValid).to.be.equal(false);
  });
});

describe('Given I have an instance of period Type', () => {
  let periodTypes;

  before(() => {
    periodTypes = periodType.get();
  });

  it('should return a defined period types', () => {
    expect(typeof periodTypes !== undefined).to.be.equal(true);
  });
});
