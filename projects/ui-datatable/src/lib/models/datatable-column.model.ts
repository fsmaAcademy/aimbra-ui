import { DataTableColumnType } from './datatable-column-type.model';

export class DataTableColumn {
  public key: any;
  public value: any;
  public type: DataTableColumnType;
  public title: string;
  public limit: number;
  public format: string;
  public textColor: string;
  public backgroundColor: string;
  public primaryDisplayValue: boolean;
  public customRender: () => any;
  public badgeColor: string;
}
