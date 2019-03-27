import { Runner } from './runner';
import { Fetcher } from './fetcher';
import ProgressPromise from 'progress-promise';

export class MultiFetcher extends Fetcher {
  constructor(fetchers) {
    super();
    this._fetchers = fetchers;
  }

  get url() {
    throw new Error('Should implement url generation');
  }

  get() {
    const promises = this._fetchers.map((fetcher) => (new Runner()).getResults(fetcher));

    return ProgressPromise.all(promises);
  }
}
