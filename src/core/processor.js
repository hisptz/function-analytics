export class Dependency {
  constructor(processor, process) {
    this.processor = processor;
    this.process = process;
  }
}
export class Processor {
  constructor() {
    this.postProcessors = [];
    this.dependencies = [];
  }
  hasDependencies() {
    return this.dependencies.length > 0;
  }
  preProcess(dependency) {
    this.dependencies.push(dependency);
    return this;
  }
  postProcess(callback) {
    this.postProcessors.push(callback);
    return this;
  }
  performPreProcess() {
    this.dependencies.forEach((dependency) => {
      console.log('dependency.processor._results:', dependency.processor._results);
      dependency.process(dependency.processor._results, this);
    });
    return this;
  }
  performPostProcess(data) {
    this._results = data;
    let dataToProcess = data;

    this.postProcessors.forEach((callback) => {
      dataToProcess = callback(dataToProcess);
    });
    return dataToProcess;
  }
}
