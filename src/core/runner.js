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
  _fetch(fetcher, resolve, reject) {
    if (!_instance) {
      let error = 'Configration not set please configre function ' +
        'analytics eg {baseUrl:"dhis_base_url", username:"username", ' +
        'password:"password"}';

      throw Error(error);
    }
    const config = {
      url: _instance.config.baseUrl + fetcher.url,
      method: 'get',
      adapter: typeof process !== 'undefined' ? httpadapter : xhradapter
    };

    if (_instance.config.username && _instance.config.password) {
      config.auth = {
        username: _instance.config.username,
        password: _instance.config.password
      };
    }
    axios.request(config).then((results) => {
      resolve(fetcher.performPostProcess(results.data));
    }, (err) => {
      reject(err);
    });
  }
  getResults(fetcher) {
    return new ProgressPromise((resolve, reject, progress) => {
      if (fetcher.hasDependencies()) {
        fetcher.getDependecyFetchResults().then(() => {
          fetcher.performPreProcess();
          this._fetch(fetcher, resolve, reject);
        }).catch((err) => {
          console.log('Errrrrrrrrrr:', err);
          reject();
        });
      } else {
        this._fetch(fetcher, resolve, reject);
      }
    });
  }

  getAllResults(multifetcher) {
    return new ProgressPromise((resolve, reject, progress) => {
      const promises = multifetcher.fetchers.map((fetcher) => (new Runner()).getResults(fetcher));

      return ProgressPromise.all(promises).then((results) => {
        resolve(multifetcher.performPostProcess(results));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
