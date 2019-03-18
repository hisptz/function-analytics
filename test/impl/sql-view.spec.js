/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../../src/index';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of SQL View Data', () => {
  describe('When I need the url', () => {
    it('should return the url', () => {
      const lib = new Fn.SQLViewData('dx');
      expect(lib.url).to.be.equal('sqlViews/dx/data.json');
    });
  });
});
