import { Fetcher } from '../core/fetcher';

export class Analytics extends Fetcher {

  setParameters(parameters) {
    return this;
  }
  setData(dx) {
    return this;
  }
  setPeriod(pe) {
    return this;
  }
  setOrgUnit(ou) {
    return this;
  }
  setDimension(dim) {
    return this;
  }

  get url() {
    return '';
  }
}
