import { Runner } from './runner';
import { Processor } from './processor';

export class Fetcher extends Processor {
  constructor() {
    super();
  }

  get url() {
    throw new Error('Should implement url generation');
  }
  getResults() {
    return (new Runner()).getResults(this);
  }
}
