import { Analytics } from './analytics';

/**
 * This represents the Event Analytics Fetcher for processing analytics calls
 *
 * @extends Analytics
 */
export class EventAnalytics extends Analytics {
  /**
   * Sets the Program for the fetch
   * @param {string} program - The id of the program
   * @returns {EventAnalytics} - Object with the event analytics
   */
  setProgram(program) {
    this.program = program;
    return this;
  }
  /**
   * Gets the url for fetching
   * @returns {string}
   */
  get url() {
    return 'analytics/events/query/' + this.program + '?' + this._urlParameters;
  }
}
