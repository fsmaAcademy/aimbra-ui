import { DataTableRow } from './datatable-row.model';

export interface IDataTableRender {
  getRowDefinition(): DataTableRow;
}
