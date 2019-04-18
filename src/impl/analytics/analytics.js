import { Fetcher } from '../../core/fetcher';
import { AnalyticsResult } from './analytics-result';
/**
 * This represents the Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */
export class Analytics extends Fetcher {
         /**
          * Creates an analytics fethcer
          *
          * @param version - The version of dhis analytics structure to use
          */
         constructor(version = 25) {
           super();
           if (typeof version === 'boolean') {
             if (version) {
               version = 25;
             } else {
               version = 26;
             }
           }
           this.parameters['dimension'] = {};
           this.postProcess(data => {
             return this.standardizeAnalytics(data, version);
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
          * @param version - The version of dhis analytics structure to use
          * @returns {AnalyticsResult}
          */
         standardizeAnalytics(analyticsObject, version = 25) {
           if (typeof version === 'boolean') {
             if (version) {
               version = 25;
             } else {
               version = 26;
             }
           }
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
               analyticsObject.headers.forEach(header => {
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
                   version
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
           return new AnalyticsResult(sanitizedAnalyticsObject);
         }

         /**
          * Standardizes the analytics metadata object
          *
          * @param analyticMetadata - The analytics metadata object
          * @param version - The version of dhis analytics structure to use
          * @returns {Object}
          */
         getSanitizedAnalyticsMetadata(analyticMetadata, version) {
           let sanitizedMetadata = {};

           if (analyticMetadata) {
             if (analyticMetadata.ouHierarchy) {
               sanitizedMetadata.ouHierarchy =
                 analyticMetadata.ouHierarchy;
             }
             if (version < 26) {
               // Get old structure
               sanitizedMetadata.names = {};
               if (analyticMetadata.names) {
                 sanitizedMetadata.names = analyticMetadata.names;
               } else if (analyticMetadata.items) {
                 Object.keys(analyticMetadata.items).forEach(nameKey => {
                   sanitizedMetadata.names[nameKey] =
                     analyticMetadata.items[nameKey].name;
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
             } else {
               // Get new structure
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
                   if (
                     ['names', 'items', 'dimensions'].indexOf(
                       nameKey
                     ) === -1
                   ) {
                     sanitizedMetadata.dimensions[nameKey] =
                       analyticMetadata[nameKey];
                   }
                 });
               } else {
                 sanitizedMetadata.dimensions =
                   analyticMetadata.dimensions;
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