export class DataTableFilter {
  public limit: number;
  public offset: number;
  public searchString: string;
  public orderBy: string;
  public orderDir: string;
  public stringParams: Map<string, string> = new Map<string, string>();

  constructor(searchString: string = null, limit: number = 10, offset: number = 0) {
  }

  public clear(): void {
    this.stringParams.clear();
  }

  public getParams(): Map<string, string> {
    if (this.limit !== null && this.limit !== undefined && this.limit !== -1) {
      this.stringParams.set('limit', this.limit.toString());
    }
    if (this.offset !== null && this.offset !== undefined && this.offset !== -1) {
      this.stringParams.set('offset', this.offset.toString());
    }
    if (this.orderBy !== null && this.orderBy !== undefined) {
      this.stringParams.set('orderBy', this.orderBy.toString());
    }
    if (this.orderDir !== null && this.orderDir !== undefined) {
      this.stringParams.set('orderDir', this.orderDir.toString());
    }
    return this.stringParams;
  }

  public addParam(paramName: string, paramValue: string): void {
    if (paramName !== null && paramName !== undefined && paramName !== '') {
      this.stringParams.set(paramName, paramValue);
    }
  }

  public addParams(params: Map<string, string>): void {
    if (params !== null && params !== undefined && params.size > 0) {
      params.forEach((value: string, key: string) => {
        this.addParam(value, key);
      });
    }
  }


}
