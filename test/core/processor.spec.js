/* global describe, it, before */

import chai from 'chai';
import { Processor } from '../../src/core/processor';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Processor', () => {
  before(() => {
    lib = new Processor();
    lib.process((data)=>{
      if (parseFloat(data[0]) > 100) {
        return ['100'];
      }
      return data;
    });
  });
  describe('When I performa a process', () => {
    it('should return vale equal or less than 100', () => {
      expect(lib.performProcess(['100'])[0]).to.be.equal('100');
      expect(lib.performProcess(['90'])[0]).to.be.equal('90');
      expect(lib.performProcess(['100.1'])[0]).to.be.equal('100');
    });
  });
});
