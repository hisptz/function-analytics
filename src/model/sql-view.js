import { Fetcher } from '../utilities/fetcher';

/**
 * Represents a fetcher to load sql view data
 *
 * @extends Fetcher
 */
export class SQLViewData extends Fetcher {

  /**
   * Creates the SQLViewData Instance
   * @param {string} id - The Sql View identifier
   */
  constructor(id) {
    super();
    this._id = id;
    this.parameters['var'] = {};
  }

  /**
   * Sets the variable for the fetching of the sql view data
   * @param {string} variable - Variable identifier
   * @param {string} value - Value of the variable identifier
   * @returns {SQLViewData} - Object of the sql view
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
