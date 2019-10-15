export class RList<T> extends Array<T> {

  public list: Array<T> = [];
  private _totalRecords: number;

  constructor() {
    super();
  }

  public clear(): [] {
    return [];
  }

  set length(newLength: number) {
    this.list.length = newLength;
  }

  get length(): number {
    return this.list.length;
  }

  get totalRecords(): number {
    return this._totalRecords;
  }

  set totalRecords(totalRecords: number) {
    this._totalRecords = totalRecords;
  }

}
