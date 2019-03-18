import { Fetcher } from '../core/fetcher';

export class IdentifiableObject extends Fetcher {
  constructor() {
    super();
    this._filters = [];
  }
  get name() {
    throw Error('Object name not implemented');
  }
  where(right, operator, left) {
    this._filters.push({
      right: right,
      operator: operator,
      left: left
    });
    return this;
  }

  get url() {
    var url = this.name + '.json?';

    this._filters.forEach((filter) => {
      url += 'filter=' + filter.right;
      if (filter.operator === '==') {
        url += ':eq:' + filter.left;
      }
    });
    return url;
  }
}
