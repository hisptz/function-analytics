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
   * @param ou
   * @returns {Analytics}
   */
  setOrgUnit(ou) {
    this.setDimension('ou', ou);
    return this;
  }

  /**
   * Sets the dimension for the fetching of the analytics
   * @param {dim, value}
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
    let sanitizedMetadata = {
      dimensions: {},
      names: {},
      dx: [],
      pe: [],
      ou: [],
      co: []
    };

    if (analyticMetadata) {
      if (analyticMetadata.ouHierarchy) {
        sanitizedMetadata.ouHierarchy = analyticMetadata.ouHierarchy;
      }
      /**
       * Get metadata names
       */
      if (analyticMetadata.names) {
        sanitizedMetadata.names = analyticMetadata.names;
      } else if (analyticMetadata.items) {
        let metadataNames = {};

        for (let metadataItemKey in analyticMetadata.items) {
          metadataNames[metadataItemKey] =
            analyticMetadata.items[metadataItemKey].name;
        }

        sanitizedMetadata['names'] = metadataNames;
      }

      /**
       * Get metadata dimensions
       */
      if (analyticMetadata.dimensions) {
        if (!preferNormalStructure) {
          sanitizedMetadata['dimensions'] = analyticMetadata.dimensions;
        } else {
          delete sanitizedMetadata.dimensions;
          sanitizedMetadata.dx = analyticMetadata.dimensions.dx;
          sanitizedMetadata.ou = analyticMetadata.dimensions.ou;
          sanitizedMetadata.pe = analyticMetadata.dimensions.pe;
          sanitizedMetadata.co = analyticMetadata.dimensions.co;
        }
      } else {
        let metadataDimensions = {};

        for (let metadataKey in analyticMetadata.dimensions) {
          if (analyticMetadata.hasOwnProperty(metadataKey)) {
            if (metadataKey !== 'names') {
              metadataDimensions[metadataKey] =
                analyticMetadata.dimensions[metadataKey];
            }
          }
        }

        if (!preferNormalStructure) {
          sanitizedMetadata['dimensions'] = metadataDimensions;
        } else {
          sanitizedMetadata.dx = metadataDimensions.dx;
          sanitizedMetadata.ou = metadataDimensions.ou;
          sanitizedMetadata.pe = metadataDimensions.pe;
          sanitizedMetadata.co = metadataDimensions.co;
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
