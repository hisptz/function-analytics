import { Fetcher } from '../core/fetcher';

export class SQLViewData extends Fetcher {
  constructor(id) {
    super();
    this._id = id;
  }

  get url() {
    return '';
  }
}
