export class SQLViewData {
  constructor(id) {
    this._id = id;
  }

  setFilter(filter) {
    return this;
  }

  getUrl() {
    return this;
  }
  dependsOn(callback) {
    return this;
  }
  process(callback) {
    return this;
  }
  getResults() {
    return this;
  }
}
