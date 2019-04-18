import { Fetcher } from '../utilities/fetcher';

/**
 * Represents a fetcher to load sql view data
 *
 * @extends Fetcher
 */
export class SQLViewData extends Fetcher {

  /**
   * Creates the SQLViewData Instance
   * @param id
   */
  constructor(id) {
    super();
    this._id = id;
    this.parameters['var'] = {};
  }

  /**
   * Sets the dimension for the fetching of the analytics
   * @param {string} dim - Dynamic Dimension identifier
   * @param {string} value - Dynamic dimension options identifiers
   * @returns {Analytics}
   */
  setVariable(variable, value) {
    this.parameters['var'][variable] = value ? value : '';
    return this;
  }
  /**
   * Gets the url for fetching
   * @returns {string}
   */
  get url() {
    let url = 'sqlViews/' + this._id + '/data.json?' + this._urlParameters;

    return url;
  }
}
