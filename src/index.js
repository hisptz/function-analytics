import {Analytics} from './impl/analytics.js';
import {SQLViewData} from './impl/sql-view.js';
import {OrganisationUnit} from './impl/organisation-unit.js';
import {ProgressPromise} from './promise/progress-promise.js';
import { Runner } from './core/runner.js';
let Fn = {
  Promise: ProgressPromise,
  Analytics: Analytics,
  OrganisationUnit: OrganisationUnit,
  SQLViewData: SQLViewData,
  Runner: Runner,
  init: (config)=>{
    Runner.initiateRunner(config);
  }
};

export { Fn };
