import { Runner } from './runner';

export class Fetcher {
  constructor() {}

  get url() {
    return '';
  }
  dependsOn(callback) {
    return this;
  }
  process(callback) {
    return this;
  }
  getResults() {
    return (new Runner()).getResults(this);
  }
}
