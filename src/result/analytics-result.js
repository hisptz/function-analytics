import {Row} from './row';

/**
 * This represents the Analytics Results
 *
 */
export class AnalyticsResult {
  /**
   * Creates ana Analytics Object
   *
   * @param {Object} - DHIS Analytics object
   */
  constructor(analyticsObject) {
    this._data = analyticsObject;
  }

  /**
   * Gets the Analytics Headers Array
   *
   * @returns {Array} - DHIS Analytics headers
   */
  get headers() {
    return this._data.headers;
  }

  /**
   * Gets the Analytics Metadata Object
   *
   * @returns {*|metaData|{dimensions, names, dx, pe, ou, co}|{ouHierarchy, items, dimensions}}
   */
  get metaData() {
    return this._data.metaData;
  }

  /**
   * Gets the rows of the analytics object
   *
   * @returns {Array}
   */
  get rows() {
    let rows = [];

    this._data.rows.forEach((row) => {
      rows.push(new Row(row, this.headers, this.metaData));
    });
    return rows;
  }

  /**
   * Gets the dimension details by name of the dimension
   * 
   * @param {string} id
   *
   * @returns {Object|{id,name,!path}}
   */
  getDimensionDetailsByName(name) {
    var results = [];

    if (this.metaData.names) {
      name = this.metaData.names[id];
    } else if (this.metaData.items) {
      name = this.metaData.items[id] ? this.metaData.items[id].name : undefined;
    }
    return {
      id: id,
      name: name,
      path:
        this.metaData.ouHierarchy &&
          this.metaData.ouHierarchy[id] !== undefined ? this.metaData.ouHierarchy[id] : undefined
    };
  }
  /**
   * Gets the dimension details of a given id
   * 
   * @param {string} id
   *
   * @returns {Object|{id,name,!path}}
   */
  getDimensionDetails(id) {
    var name = '';

    if (this.metaData.names) {
      name = this.metaData.names[id];
    } else if (this.metaData.items) {
      name = this.metaData.items[id] ? this.metaData.items[id].name : undefined;
    }
    return {
      id: id,
      name: name,
      path:
        this.metaData.ouHierarchy &&
          this.metaData.ouHierarchy[id] !== undefined ? this.metaData.ouHierarchy[id] : undefined
    };
  }
  /**
   * Gets the Analytics height
   *
   * @returns {number} - The number of rows
   */
  get height() {
    return this._data.height;
  }

  /**
   * Gets the Analytics width
   *
   * @returns {number}
   */
  get width() {
    return this._data.width;
  }
}
