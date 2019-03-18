export class Processor {
  constructor() {
    this.resultProcessors = [];
  }
  dependsOn(callback) {
    return this;
  }
  process(callback) {
    this.resultProcessors.push(callback);
    return this;
  }
  performProcess(data) {
    var dataToProcess = data;

    this.resultProcessors.forEach((callback) => {
      dataToProcess = callback(dataToProcess);
    });
    return dataToProcess;
  }
}
