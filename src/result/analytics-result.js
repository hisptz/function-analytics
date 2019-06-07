import {Row} from './row';

/**
 * This represents the Analytics header
 *
 */
export class AnalyticsHeader {}
/**
 * This represents the Analytics Headers
 *
 * @extends Array
 */
export class AnalyticsHeaders extends Array {
  constructor(data) {
    super(...data);
    Object.setPrototypeOf(this, Object.create(AnalyticsHeaders.prototype));
  }

  /**
   * Gets the data analytics header
   *
   * @returns {AnalyticsHeader}
   */
  get dx() {
    return this.getHeader('dx');
  }

  /**
   * Gets the period analytics header
   *
   * @returns {AnalyticsHeader}
   */
  get pe() {
    return this.getHeader('pe');
  }

  /**
   * Gets the organisation unit analytics header
   *
   * @returns {AnalyticsHeader}
   */
  get ou() {
    return this.getHeader('ou');
  }

  /**
   * Gets the value analytics header
   *
   * @returns {AnalyticsHeader}
   */
  get value() {
    return this.getHeader('value');
  }

  /**
   * Gets the header of a parameter
   * @param id
   * @returns {AnalyticsHeader}
   */
  getHeader(id) {
    let returnHeader;

    this.forEach((header, index) => {
      if (header.name === id) {
        returnHeader = header;
        returnHeader.index = index;
      }
    });
    return returnHeader;
  }
}

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
  /*
  get headers() {
    return this._data.headers;
  }
  */

  /**
   * Gets the Analytics Headers Array
   *
   * @returns {AnalyticsHeaders}
   */
  get headers() {
    return new AnalyticsHeaders(this._data.headers);
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
   * @param {string} id
   *
   * @returns {Object|{id,name,!path}}
   */
  getDimensionDetailsByName(name) {
    var results = [];

    if (this.metaData.dimensions) {
      this.metaData.dimensions[name].forEach((item) => {
        results.push(this.getDimensionDetails(item));
      });
    }
    return results;
  }

  /**
   * Gets the ou of the analytics object
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
   * Gets the dimension details of a given id
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
