/**
 * This callback type is called `processCallback`.
 *
 * @callback processCallback
 * @param {Object} result
 */

/**
 * Represents a process dependency
 */
export class Dependency {
  /**
   * Creates a dependency instance
   * @param {Processor} processor
   * @param {processCallback} process
   */
  constructor(processor, process) {
    this.processor = processor;
    this.process = process;
  }
}

/**
 * This is the representation of the processor
 */
export class Processor {
  /**
   * Creates a processor
   */
  constructor() {
    this.postProcessors = [];
    this.dependencies = [];
  }

  /**
   * Checks if processor has dependencies
   * @returns {boolean}
   */
  hasDependencies() {
    return this.dependencies.length > 0;
  }

  /**
   * Adds dependency to the processor
   * @param {Dependency} dependency
   * @returns {Processor}
   */
  preProcess(dependency) {
    this.dependencies.push(dependency);
    return this;
  }

  /**
   * Adds callback process the output process
   * @param callback
   * @returns {Processor}
   */
  postProcess(callback) {
    this.postProcessors.push(callback);
    return this;
  }

  /**
   * Performs pre process
   * @returns {Processor}
   */
  performPreProcess() {
    this.dependencies.forEach((dependency) => {
      dependency.process(dependency.processor._results, this);
    });
    return this;
  }

  /**
   * Performs post process after the process has ended
   * @param {Object} data
   * @returns {Object}
   */
  performPostProcess(data) {
    this._results = data;
    let dataToProcess = data;

    this.postProcessors.forEach((callback) => {
      dataToProcess = callback(dataToProcess);
    });
    return dataToProcess;
  }
}
