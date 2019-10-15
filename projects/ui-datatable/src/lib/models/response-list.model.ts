import { assert } from 'console';

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

  public get isEmpty(): boolean {
    return (this.list !== null) && (this.list !== undefined) && (this.list.length === 0);
  }

  public get isNotEmpty(): boolean {
    return (this.list !== null) && (this.list !== undefined) && (this.list.length > 0);
  }

  public addAll(iterable: Iterable<T>): void {
    let i: number = this.length;
    for (let element: T in iterable) {
      assert(this.length == i);
      this.length = i + 1;
      this[i] = element;
      i++;
    }
  }

}
