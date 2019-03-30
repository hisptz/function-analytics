import { Fetcher } from '../core/fetcher';

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
  }

  /**
   * Gets the url for fetching
   * @returns {string}
   */
  get url() {
    var url = 'sqlViews/' + this._id + '/data.json';

    return url;
  }
}
