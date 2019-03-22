import ProgressPromise from 'progress-promise';
import axios from 'axios';
import httpadapter from 'axios/lib/adapters/http';
import xhradapter from 'axios/lib/adapters/xhr';
let _instance;

export class Runner {
  constructor() { }
  static initiateRunner(configurations) {
    if (!Runner.instance) {
      this.config = configurations;
      _instance = this;
    }
  }
  get instance() {
    return _instance;
  }
  set config(configurations) {
    this.config = configurations;
  }
  get config() {
    return this.config;
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
      fetcher.performPreProcess();
      axios.request({
        url: _instance.config.baseUrl + fetcher.url,
        method: 'get',
        adapter: typeof process !== 'undefined' ? httpadapter : xhradapter,
        auth: {
          username: _instance.config.username,
          password: _instance.config.password
        }
      }).then((results) => {
        resolve(fetcher.performPostProcess(results.data));
      }, (err) => {
        console.log('Err Results:', err);
        reject(err);
      });
    });
  }
}
