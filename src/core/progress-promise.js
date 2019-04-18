'use strict';
// Fallback for engines that don't support Symbol
const LISTENERS = Symbol ? Symbol() : '__listeners';

/**
 * Represents Progress Promise
 * @extends Promise
 */
export class ProgressPromise extends Promise {
  constructor(executor) {
    super((resolve, reject) =>
      executor(
        resolve,
        reject,
        // Pass method for passing progress to listener
        value => {
          try {
            return this[LISTENERS].forEach(listener => listener(value));
          } catch (error) {
            reject(error);
          }
          return undefined;
        }
      )
    );
    this[LISTENERS] = [];
  }
  /**
   *
   * @param {callback} handler
   */
  progress(handler) {
    if (typeof handler !== 'function') {
      throw new Error('PROGRESS_REQUIRES_FUNCTION');
    }
    this[LISTENERS].push(handler);
    return this;
  }
  /**
   *
   * @param {*} promises
   */
  static all(promises) {
    const results = new Array(promises.length);
    const length = promises.length;
    let resolveCount = 0;

    return new ProgressPromise((resolve, reject, progress) => {
      promises.forEach((promise, index) => {
        promise
          .then(result => {
            results[index] = result;
            results.proportion = ++resolveCount / length;
            progress(results);
            if (resolveCount === length) resolve(results);
          })
          .catch(reject);
      });
    });
  }
  /**
   *
   * @param {*} inputs
   * @param {*} handler
   */
  static sequence(inputs, handler) {
    const results = [];
    const length = inputs.length;
    let resolveCount = 0;

    return new ProgressPromise((resolve, reject, progress) => {
      function invokeNext() {
        handler
          .call(null, inputs[results.length])
          .then(result => {
            results.push(result);
            results.proportion = ++resolveCount / length;
            progress(results);
            if (results.length === length) resolve(results);
            else invokeNext();
          })
          .catch(reject);
      }
      invokeNext();
    });
  }
}
