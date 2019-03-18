import { Fetcher } from '../core/fetcher';

export class SQLViewData extends Fetcher {
  constructor(id) {
    super();
    this._id = id;
  }

  get url() {
    var url = 'sqlViews/' + this._id + '/data.json';

    return url;
  }
}
