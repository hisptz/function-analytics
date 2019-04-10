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
    return analytics.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.metaData !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
  it('should return promise with analytics results with ouHierarch', () => {
    var analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('ImspTQPwCqd')
      .setParameters({
        hierarchyMeta: 'true'
      });
    return analytics.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.metaData.ouHierarchy !== undefined).to.be.equal(true);
      expect(results.metaData !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
  it('should return promise with sql results results', () => {
    var sqlView = new Fn.SQLViewData('GCZ01m3pIRd');

    return sqlView.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
      expect(results.title !== undefined).to.be.equal(true);
      expect(results.subtitle !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
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
    return analytics.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
});

describe('Given an initial instance (Multiple Process Test)', () => {
  it('should return promise with multiple results (Multiple Post Processing)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses = new Fn.MultiFetcher([orgunitProcessor, analytics]);
    return multiProcesses.get().then((results) => {
      expect(results.length).to.be.equal(2);
      expect(results[0].organisationUnits !== undefined).to.be.equal(true);
      expect(results[1].headers !== undefined).to.be.equal(true);
      expect(results[1].rows !== undefined).to.be.equal(true);
      expect(results[1].height !== undefined).to.be.equal(true);
      expect(results[1].width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
  it('should return promise with multiple results with post processing (Multiple Post Processing)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses = new Fn.MultiFetcher([orgunitProcessor, analytics]);
    multiProcesses.postProcess((res) => {
      return [res[1], res[0]];
    });
    return multiProcesses.get().then((results) => {
      expect(results.length).to.be.equal(2);
      expect(results[1].organisationUnits !== undefined).to.be.equal(true);
      expect(results[0].headers !== undefined).to.be.equal(true);
      expect(results[0].rows !== undefined).to.be.equal(true);
      expect(results[0].height !== undefined).to.be.equal(true);
      expect(results[0].width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);

  it('should return promise with multiple results with post processing within another multiple process (Multiple Post Processing)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses = new Fn.MultiFetcher([orgunitProcessor, analytics]);
    multiProcesses.postProcess((res) => {
      return [res[1], res[0]];
    });

    let orgunitProcessor2 = new Fn.OrganisationUnit();

    orgunitProcessor2.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics2 = new Fn.Analytics();

    analytics2
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses2 = new Fn.MultiFetcher([orgunitProcessor2, analytics2]);
    multiProcesses2.postProcess((res) => {
      return [res[1], res[0]];
    });
    return (new Fn.MultiFetcher([multiProcesses, multiProcesses2])).get().then((results) => {
      expect(results.length).to.be.equal(2);
      expect(results[0].length).to.be.equal(2);
      expect(results[1].length).to.be.equal(2);
      expect(results[0][1].organisationUnits !== undefined).to.be.equal(true);
      expect(results[0][0].headers !== undefined).to.be.equal(true);
      expect(results[0][0].rows !== undefined).to.be.equal(true);
      expect(results[0][0].height !== undefined).to.be.equal(true);
      expect(results[0][0].width !== undefined).to.be.equal(true);

      expect(results[1][1].organisationUnits !== undefined).to.be.equal(true);
      expect(results[1][0].headers !== undefined).to.be.equal(true);
      expect(results[1][0].rows !== undefined).to.be.equal(true);
      expect(results[1][0].height !== undefined).to.be.equal(true);
      expect(results[1][0].width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
});
