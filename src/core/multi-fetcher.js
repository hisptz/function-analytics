import { Runner } from './runner';
import { Fetcher } from './fetcher';

export class MultiFetcher extends Fetcher {
  constructor(fetchers) {
    super();
    this._fetchers = fetchers;
  }
  get fetchers() {
    return this._fetchers;
  }

  get() {
    return (new Runner()).getAllResults(this);
  }
}
