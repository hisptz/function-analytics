import { Fetcher } from '../core/fetcher';

export class Analytics extends Fetcher {

  setParameters(parameters) {
    if (parameters.dx) {
      this.setData(parameters.dx);
    }
    if (parameters.ou) {
      this.setData(parameters.ou);
    }
    if (parameters.pe) {
      this.setData(parameters.pe);
    }
    return this;
  }
  setData(dx) {
    this.dx = dx;
    return this;
  }
  setPeriod(pe) {
    this.pe = pe;
    return this;
  }
  setOrgUnit(ou) {
    this.ou = ou;
    return this;
  }
  setDimension(dim) {
    return this;
  }

  get url() {
    var url = 'analytics?';

    if (this.dx) {
      url += 'dimension=dx:' + this.dx;
    }
    if (this.ou) {
      if (url.indexOf('dimension') > -1) {
        url += '&';
      }
      url += 'dimension=ou:' + this.ou ;
    }
    if (this.pe) {
      if (url.indexOf('dimension') > -1) {
        url += '&';
      }
      url += 'dimension=pe:' + this.pe ;
    }
    return url;
  }
}
