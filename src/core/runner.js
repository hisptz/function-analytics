import { ProgressPromise } from '../promise/progress-promise';
import { Axios } from 'axios';

export class Runner {
  instance;
  config;
  constructor() { }
  static initiateRunner(config) {
    if (!Runner.instance) {
      Runner.instance = this;
      Runner.instance.config = config;
    }
  }

  allResults(executions) {
    return Runner.instance;
  }
  resolveProgress(progressCallback) {
    return Runner.instance;
  }
  process(callback) {
    return Runner.instance;
  }
  getResults(fetcher) {
    return new ProgressPromise((resolve, reject, progress) => {
      Axios.get(this.config.baseUrl + fetcher.url).then((results) => {
        console.log('Results:', results);
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
