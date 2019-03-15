import {Analytics} from './implementation/analytics.js';
import ProgressPromise from './promise/progress-promise.js';
let Fn = {
  Promise: ProgressPromise,
  Analytics: Analytics
};

export { Fn };
