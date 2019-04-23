/**
 * This represents the Analytics Results
 *
 */
export class Row {
  /**
   * Creates ana Analytics Object
   *
   * @param {Array} row - The analytics row
   * @param {Array} headers - The analytics headers
   * @param {Object} metaData - The analytics metadata
   */
  constructor(row, headers, metaData) {
    this.row = row;
    this.headers = headers;
    this.metaData = metaData;
  }

  /**
   * Gets the dimension details of the analytics row
   * @param {string} id - The id of the dimension
   * @returns {Object|{id,name,path}} - The data object with name and id
   */
  dimension(id) {
    var i = -1,
      name = '';

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
   * Gets the data details of the analytics row
   *
   * @returns {Object|{id,name}} - The data object with name and id
   */
  get dx() {
    return this.dimension('dx');
  }

  /**
   * Gets the period details of the analytics row
   *
   * @returns {Object|{id,name}} - The period object
   */
  get pe() {
    return this.dimension('pe');
  }

  /**
   * Gets the organisation unit details of the analytics row
   *
   * @returns {Object|{id,name,path}} - The organisation unit object
   */
  get ou() {
    return this.dimension('ou');
  }

  /**
   * Gets the value in a row
   *
   * @returns {string} - The value
   */
  get value() {
    return this.dimension('value').id;
  }
}
