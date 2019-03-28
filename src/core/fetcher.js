import { Runner } from './runner';
import { Processor } from './processor';
import ProgressPromise from 'progress-promise';

export class Fetcher extends Processor {
  constructor() {
    super();
    this.parameters = {};
  }

  get _urlParameters() {
    let url = '';

    Object.keys(this.parameters).forEach((key) => {
      if (url !== '') {
        url += '&';
      }
      if (typeof this.parameters[key] === 'string') {
        url += key + '=' + this.parameters[key];
      } else {
        Object.keys(this.parameters[key]).forEach((key2) => {
          if (url !== '') {
            url += '&';
          }
          url += key + '=' + key2 + ':' + this.parameters[key][key2];
        });
      }
    });
    return url;
  }
  get url() {
    throw new Error('Should implement url generation');
  }
  get() {
    return (new Runner()).getResults(this);
  }
  setParameters(parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key];
    });
    return this;
  }
  getDependecyFetchResults() {
    const promises = this.dependencies.map((dependency) => {
      return (new Runner()).getResults(dependency.processor);
    });

    return ProgressPromise.all(promises);
  }
}
