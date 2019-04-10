import { Fetcher } from '../core/fetcher';

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
export class AnalyticsObject {
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
    return this._data.rows;
  }

  /**
   * Gets the Analytics height
   *
   * @returns {number}
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

/**
 * This represents the Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */
export class Analytics extends Fetcher {
  /**
   * Creates an analytics fethcer
   *
   * @param oldAnalytics - Whether the structure to be returned should be old or new.
   */
  constructor(oldAnalytics = true) {
    super();
    this.parameters['dimension'] = {};
    this.postProcess(data => {
      return this.standardizeAnalytics(data, oldAnalytics);
    });
  }

  /**
   * Sets the data for the fetch
   * @param dx
   * @returns {Analytics}
   */
  setData(dx) {
    this.setDimension('dx', dx);
    return this;
  }

  /**
   * Sets the period for the fetch
   * @param pe
   * @returns {Analytics}
   */
  setPeriod(pe) {
    this.setDimension('pe', pe);
    return this;
  }

  /**
   * Sets the organisation unit for the fetching of the analytics
   * @param {string} ou - Organisation unit
   * @returns {Analytics} Analytics results
   */
  setOrgUnit(ou) {
    this.setDimension('ou', ou);
    return this;
  }

  /**
   * Sets the dimension for the fetching of the analytics
   * @param {string} dim - Dynamic Dimension identifier
   * @param {string} value - Dynamic dimension options identifiers
   * @returns {Analytics}
   */
  setDimension(dim, value) {
    this.parameters['dimension'][dim] = value ? value : '';
    return this;
  }

  /**
   * Standardizes the analytics object
   *
   * @param analyticsObject - The analytics object
   * @param preferNormalStructure - Whether to prefer the old or new analytics structure
   * @returns {AnalyticsObject}
   */
  standardizeAnalytics(analyticsObject, preferNormalStructure = true) {
    // if Serverside Event clustering do nothing
    if (analyticsObject.count) {
      return analyticsObject;
    }
    let sanitizedAnalyticsObject = {
      headers: [],
      metaData: {
        dimensions: {},
        names: {},
        dx: [],
        pe: [],
        ou: [],
        co: []
      },
      rows: []
    };

    if (analyticsObject) {
      /**
       * Check headers
       */
      if (analyticsObject.headers) {
        analyticsObject.headers.forEach((header) => {
          try {
            let newHeader = header;

            sanitizedAnalyticsObject.headers.push(newHeader);
          } catch (e) {
            console.warn('Invalid header object');
          }
        });
      }

      /**
       * Check metaData
       */
      if (analyticsObject.metaData) {
        try {
          let sanitizedMetadata = this.getSanitizedAnalyticsMetadata(
            analyticsObject.metaData,
            preferNormalStructure
          );

          sanitizedAnalyticsObject.metaData = sanitizedMetadata;
        } catch (e) {
          console.warn('Invalid metadata object');
        }
      }

      /**
       * Check rows
       */
      if (analyticsObject.rows) {
        sanitizedAnalyticsObject.rows = analyticsObject.rows;
      }
    }
    sanitizedAnalyticsObject.height = analyticsObject.height;
    sanitizedAnalyticsObject.width = analyticsObject.width;
    return new AnalyticsObject(sanitizedAnalyticsObject);
  }

  /**
   * Standardizes the analytics metadata object
   *
   * @param analyticMetadata - The analytics metadata object
   * @param preferNormalStructure - Whether to prefer the old or new analytics structure
   * @returns {Object}
   */
  getSanitizedAnalyticsMetadata(analyticMetadata, preferNormalStructure) {
    let sanitizedMetadata = {};

    if (analyticMetadata) {
      if (analyticMetadata.ouHierarchy) {
        sanitizedMetadata.ouHierarchy = analyticMetadata.ouHierarchy;
      }
      if (preferNormalStructure) { // Get old structure
        sanitizedMetadata.names = {};
        if (analyticMetadata.names) {
          sanitizedMetadata.names = analyticMetadata.names;
        } else if (analyticMetadata.items) {
          Object.keys(analyticMetadata.items).forEach(nameKey => {
            sanitizedMetadata.names[nameKey] = analyticMetadata.items[nameKey].name;
          });
        }

        if (analyticMetadata.dimensions) {
          Object.keys(analyticMetadata.dimensions).forEach(
            nameKey => {
              sanitizedMetadata[nameKey] =
                analyticMetadata.dimensions[nameKey];
            }
          );
        }
      } else { // Get new structure
        sanitizedMetadata.items = {};
        if (analyticMetadata.items) {
          sanitizedMetadata.items = analyticMetadata.items;
        } else if (analyticMetadata.names) {
          Object.keys(analyticMetadata.items).forEach(nameKey => {
            analyticMetadata.items[nameKey] = {
              name: analyticMetadata.names[nameKey]
            };
          });
        }

        if (!analyticMetadata.dimensions) {
          sanitizedMetadata.dimensions = {};
          Object.keys(analyticMetadata).forEach(nameKey => {
            if (['names', 'items', 'dimensions'].indexOf(nameKey) === -1) {
              sanitizedMetadata.dimensions[nameKey] = analyticMetadata[nameKey];
            }
          });
        } else {
          sanitizedMetadata.dimensions = analyticMetadata.dimensions;
        }
      }
    }
    return sanitizedMetadata;
  }

  /**
   * Gets the url for fetching
   * @returns {string}
   */
  get url() {
    return 'analytics?' + this._urlParameters;
  }
}
