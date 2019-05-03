/**
 * This callback type is called `processCallback`.
 *
 * @mixin
 * @callback processCallback
 * @param {Object} result
 */

/**
 * Represents a process dependency
 */
export class Dependency {
  /**
   * Creates a dependency instance
   * @param {Process} process
   * @param {processCallback} processCallback
   */
  constructor(process, processCallback) {
    this.process = process;
    this.processCallback = processCallback;
  }
}
