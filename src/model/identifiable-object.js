import { Fetcher } from '../utilities/fetcher';

/**
 * Represents Identifiable Object
 *@extends Fetcher
 */
export class IdentifiableObject extends Fetcher {

  /**
   * Creates a fethcer
   * @constructor
   */
  constructor(objectName) {
    super();
    this._filters = [];
    this.objectName = objectName;
  }
  get name() {
    return this.objectName;
  }

  /**
   * Sets the where clause for filtering of data
   * @param {string} right - Right expression
   * @param {string} operator - Expression operator
   * @param {string|array} left - Right expression
   * @returns {IdentifiableObject} IdentifiableObject Identifiable object with where clause appended
   */
  where(right, operator, left) {
    this._filters.push({
      right: right,
      operator: operator,
      left: left
    });
    return this;
  }

  get url() {
    var url = this._urlParameters;

    this._filters.forEach((filter) => {
      if (url !== '') {
        url += '&';
      }
      url += 'filter=' + filter.right;
      if (filter.operator === '==') {
        url += ':eq:' + filter.left;
      } else if (filter.operator === '<') {
        url += ':lt:' + filter.left;
      } else if (filter.operator === '<=') {
        url += ':le:' + filter.left;
      } else if (filter.operator === '>') {
        url += ':gt:' + filter.left;
      } else if (filter.operator === '>=') {
        url += ':ge:' + filter.left;
      } else if (filter.operator === '<>') {
        url += ':!eq:' + filter.left;
      } else if (filter.operator === 'in' || filter.operator === '!in') {
        url += ':' + filter.operator + ':[' + filter.left + ']';
      } else if (!filter.left) {
        url += ':' + filter.operator;
      } else {
        url += ':' + filter.operator + ':' + filter.left;
      }
    });
    return this.name + '.json?' + url;
  }
}
