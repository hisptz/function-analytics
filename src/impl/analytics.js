import { Fetcher } from '../core/fetcher';

export class Analytics extends Fetcher {

  constructor(oldAnalytics = true) {
    super();
    this.parameters['dimension'] = {};
    this.postProcess((data) => {
      return this.standardizeAnalytics(data, oldAnalytics);
    });
  }
  setData(dx) {
    this.parameters['dimension']['dx'] = dx;
    return this;
  }
  setPeriod(pe) {
    this.parameters['dimension']['pe'] = pe;
    return this;
  }
  setOrgUnit(ou) {
    this.parameters['dimension']['ou'] = ou;
    return this;
  }

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
        analyticsObject.headers.forEach(function (header) {
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
          let sanitizedMetadata = this.getSanitizedAnalyticsMetadata(analyticsObject.metaData, preferNormalStructure);

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
    return sanitizedAnalyticsObject;
  }

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
      /**
       * Get metadata names
       */
      if (analyticMetadata.names) {
        sanitizedMetadata.names = analyticMetadata.names;
      } else if (analyticMetadata.items) {

        let metadataNames = {};

        for (let metadataItemKey in analyticMetadata.items) {
          metadataNames[metadataItemKey] = analyticMetadata.items[metadataItemKey].name;
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
          sanitizedMetadata.dimensions = analyticMetadata.dimensions;
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
              metadataDimensions[metadataKey] = analyticMetadata.dimensions[metadataKey];
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

  get url() {
    return 'analytics?' + this._urlParameters;
  }
}
