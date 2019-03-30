import { Runner } from './runner';
import { Processor } from './processor';
import ProgressPromise from 'progress-promise';

/**
 * Represents the fetcher process
 *@extends Processor
 */
export class Fetcher extends Processor {
  /**
   * Creates a fethcer
   * @constructor
   */
  constructor() {
    super();
    this.parameters = {};
  }

  /**
   * Gets the URL Parameters
   * @returns {string}
   * @private
   */
  get _urlParameters() {
    let url = '';

    Object.keys(this.parameters).forEach((key) => {
      if (url !== '') {
        url += '&';
      }
      if (typeof this.parameters[key] === 'string') {
        url += key + '=' + this.parameters[key];
      } else {
        Object.keys(this.parameters[key]).forEach((key2) => {
          if (url !== '') {
            url += '&';
          }
          url += key + '=' + key2 + ':' + this.parameters[key][key2];
        });
      }
    });
    return url;
  }

  /**
   * Gets the url
   * @throws Implementation Error
   */
  get url() {
    throw new Error('Should implement url generation');
  }

  /**
   * Gets the running process started
   * @returns {ProgressPromise}
   */
  get() {
    return (new Runner()).getResults(this);
  }

  /**
   * Set paremeters
   * @param {Object} parameters
   * @returns {Fetcher}
   */
  setParameters(parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key];
    });
    return this;
  }

  /**
   * Get Dependency results
   * @returns {ProgressPromise}
   */
  getDependecyFetchResults() {
    const promises = this.dependencies.map((dependency) => {
      return (new Runner()).getResults(dependency.processor);
    });

    return ProgressPromise.all(promises);
  }
}
