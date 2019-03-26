/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../src/index';

chai.expect();

const expect = chai.expect;

Fn.init({
  baseUrl: 'https://play.dhis2.org/2.29/api/',
  username: 'admin',
  password: 'district'
});

describe('Given an initial instance', () => {
  it('Check if instance is ready', () => {
    var runner = new Fn.Runner();

    expect(runner.instance !== undefined).to.be.equal(true);
  });
  it('should return promise with analytics results', () => {
    var analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('ImspTQPwCqd');
    return analytics.getFetchResults().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  });
  it('should return promise with sql results results', () => {
    var sqlView = new Fn.SQLViewData('GCZ01m3pIRd');

    return sqlView.getFetchResults().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
      expect(results.title !== undefined).to.be.equal(true);
      expect(results.subtitle !== undefined).to.be.equal(true);
    });
  });
});

describe('Given an initial instance (Dependency Test)', () => {
  it('should return promise with analytics results (Dependency)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics.preProcess(new Fn.Dependency(
      orgunitProcessor,
      (data, analyticsProcessor)=>{
        let ous = data.organisationUnits.map((organisationUnit) => {
          return organisationUnit.id;
        }).join(';');

        analyticsProcessor
          .setPeriod('2016')
          .setOrgUnit(ous);
      }));
    return analytics.getFetchResults().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
});
