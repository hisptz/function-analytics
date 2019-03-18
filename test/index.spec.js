/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../src/index';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Analytics library', () => {
  before(() => {
    lib = new Fn.Analytics();
    lib.setData('dx1')
      .setPeriod('pe1')
      .setOrgUnit('ou1');
  });
  describe('When I need the configurations', () => {
    it('should return the url', () => {
      const url = lib.url;
      expect(url.indexOf('dimension=ou:ou1') > -1).to.be.equal(true);
      expect(url.indexOf('dimension=pe:pe1') > -1).to.be.equal(true);
      expect(url.indexOf('dimension=dx:dx1') > -1).to.be.equal(true);
    });
  });
});
