import { Runner } from './runner';
import { Processor } from './processor';
import ProgressPromise from 'progress-promise';

export class Fetcher extends Processor {
  constructor() {
    super();
  }

  get url() {
    throw new Error('Should implement url generation');
  }
  get() {
    return (new Runner()).getResults(this);
  }
  getDependecyFetchResults() {
    const promises = this.dependencies.map((dependency) => {
      return (new Runner()).getResults(dependency.processor);
    });

    return ProgressPromise.all(promises);
  }
}
