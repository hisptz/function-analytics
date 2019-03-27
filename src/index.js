import {Analytics} from './impl/analytics.js';
import {SQLViewData} from './impl/sql-view.js';
import {OrganisationUnit} from './impl/organisation-unit.js';
import ProgressPromise from 'progress-promise';
import { Runner } from './core/runner.js';
import { Dependency } from './core/processor';
let Fn = {
  Promise: ProgressPromise,
  Analytics: Analytics,
  OrganisationUnit: OrganisationUnit,
  SQLViewData: SQLViewData,
  Runner: Runner,
  Dependency: Dependency,
  init: (config)=>{
    Runner.initiateRunner(config);
  }
};

if (typeof window !== 'undefined') {
  window.Fn = Fn;
}
export { Fn };
