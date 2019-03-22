export class Dependency {
  constructor(processor, process) {
    this.processor = processor;
    this.process = process;
  }
}
export class Processor {
  constructor() {
    this.postProcessors = [];
    this.preProcessors = [];
  }
  preProcess(dependency) {
    this.preProcessors.push(dependency);
    return this;
  }
  postProcess(callback) {
    this.postProcessors.push(callback);
    return this;
  }
  performPreProcess() {
    this.preProcessors.forEach((dependency) => {
      dependency.process(dependency.processor._results);
    });
    return this;
  }
  performPostProcess(data) {
    this._results = data;
    var dataToProcess = data;

    this.postProcessors.forEach((callback) => {
      dataToProcess = callback(dataToProcess);
    });
    return dataToProcess;
  }
}
