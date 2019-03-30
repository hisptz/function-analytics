import {Analytics, AnalyticsObject, AnalyticsHeaders} from './impl/analytics.js';
import {SQLViewData} from './impl/sql-view.js';
import {OrganisationUnit} from './impl/organisation-unit.js';
import ProgressPromise from 'progress-promise';
import { Runner } from './core/runner.js';
import { Dependency } from './core/processor';
import { MultiFetcher } from './core/multi-fetcher';

/**
 * This is the main holder for the functionalities of the function
 * @type {{Promise: ProgressPromise, Analytics: Analytics,
  *   AnalyticsObject: AnalyticsObject, AnalyticsHeaders: AnalyticsHeaders,
  *   OrganisationUnit: OrganisationUnit, SQLViewData: SQLViewData,
  *   Runner: Runner, Dependency: Dependency, MultiFetcher: MultiFetcher,
  *   all: (function(Fetcher[])), init: (function(*=))}
  * }
 */
let Fn = {
  Promise: ProgressPromise,
  Analytics: Analytics,
  AnalyticsObject: AnalyticsObject,
  AnalyticsHeaders: AnalyticsHeaders,
  OrganisationUnit: OrganisationUnit,
  SQLViewData: SQLViewData,
  Runner: Runner,
  Dependency: Dependency,
  MultiFetcher: MultiFetcher,
  /**
   * Adds multiple fetchers in queue for execution.
   *
   * @param {Fetcher[]} fetchers - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all([new Fn.Analytics(), new Fn.OrganisationUnit()]);
   */
  all: (fetchers) => {
    return new MultiFetcher(fetchers);
  },
  /**
   * Configures the running environment parameters
   *
   * @param {Object} configuration - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all({baseUrl:''});
   */
  init: (config)=>{
    Runner.initiateRunner(config);
  }
};

if (typeof window !== 'undefined') {
  window.Fn = Fn;
}
export { Fn };
