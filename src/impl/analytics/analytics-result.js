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
