/**
 * This represents the Analytics Results
 *
 */
export class Row {
  /**
   * Creates ana Analytics Object
   *
   * @param {Object} - DHIS Analytics object
   */
  constructor(row, headers, metaData) {
    this.row = row;
    this.headers = headers;
    this.metaData = metaData;
  }

  /**
   * Gets the Analytics Headers Array
   *
   * @returns {Array} - DHIS Analytics headers
   */
  dimension(id) {
    var i = -1, name = '';

    this.headers.forEach((header, index) => {
      if (header.name === id) {
        i = index;
      }
    });
    if (this.metaData.names) {
      name = this.metaData.names[this.row[i]];
    } else if (this.metaData.items) {
      name = this.metaData.items[this.row[i]] ? this.metaData.items[this.row[i]].name : undefined;
    }
    return {
      id: this.row[i],
      name: name,
      path:
        this.metaData.ouHierarchy &&
        this.metaData.ouHierarchy[this.row[i]] !== undefined ? this.metaData.ouHierarchy[this.row[i]] : undefined
    };
  }

  /**
   * Gets the rows of the analytics object
   *
   * @returns {Array}
   */
  get dx() {
    return this.dimension('dx');
  }

  /**
   * Gets the rows of the analytics object
   *
   * @returns {Array}
   */
  get pe() {
    return this.dimension('pe');
  }

  /**
   * Gets the rows of the analytics object
   *
   * @returns {Array}
   */
  get ou() {
    return this.dimension('ou');
  }

  /**
   * Gets the rows of the analytics object
   *
   * @returns {Array}
   */
  get value() {
    return this.dimension('value').id;
  }
}
