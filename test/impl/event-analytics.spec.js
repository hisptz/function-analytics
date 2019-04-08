/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../../src/index';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Event Analytics library', () => {
  before(() => {
    lib = new Fn.EventAnalytics();
    lib.setData('dx1')
        .setProgram('program')
      .setPeriod('pe1')
      .setOrgUnit('ou1')
      .setParameters({
        displayProperty: 'SHORTNAME'
      });
  });
  it('should return the event analytics url', () => {
    const url = lib.url;

    expect(url.indexOf('dimension=ou:ou1') > -1).to.be.equal(true);
    expect(url.indexOf('dimension=pe:pe1') > -1).to.be.equal(true);
    expect(url.indexOf('dimension=dx:dx1') > -1).to.be.equal(true);
    expect(url.indexOf('displayProperty=SHORTNAME') > -1).to.be.equal(true);
    expect(url.indexOf('&') > -1).to.be.equal(true);
  });

});
