import { DataTableColumn } from './datatable-column.model';

export class DataTableRow {

  public static instance: DataTableRow;
  public colsSets: Array<DataTableColumn>;

  constructor() {
    this.colsSets = new Array<DataTableColumn>();
  }

  public static getInstance(): DataTableRow {
    if (this.instance == null) {
      return new DataTableRow();
    } else {
      return this.instance;
    }
  }

  public addSet(colSet: DataTableColumn): void {
    this.colsSets.push(colSet);
  }

  public getSets(): DataTableColumn[] {
    return this.colsSets;
  }

}


