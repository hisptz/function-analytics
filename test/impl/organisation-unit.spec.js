/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../../src/index';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Organisation Unit in the library', () => {
  describe('When I need the url', () => {
    it('should return the url with Equality', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '==', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:eq:Rp268JB6Ne4');
    });

    it('should return the url with Inequality', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<>', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:!eq:Rp268JB6Ne4');
    });

    it('should return the url with Case sensitive string,match anywhere', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case sensitive string, not match anywhere', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case sensitive string, match start', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case sensitive string, match end', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case sensitive string, not match end', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, match anywhere', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, not match anywhere', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, match start', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, not match start', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, match end', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Case insensitive string, not match end', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Greater than', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Greater than or equal', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Less than', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Less than or equal', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Property is null', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Property is not null', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Collection is empty', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Match on multiple tokens in search property', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Not match on multiple tokens in search property', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Find objects matching 1 or more values', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });

    it('should return the url with Find objects not matching 1 or more values', () => {
      lib = new Fn.OrganisationUnit();
      lib.where('id', '<', 'Rp268JB6Ne4');
      expect(lib.url).to.be.equal('organisationUnits.json?filter=id:lt:Rp268JB6Ne4');
    });
  });
});
