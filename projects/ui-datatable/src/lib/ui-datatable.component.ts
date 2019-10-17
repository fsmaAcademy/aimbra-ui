import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, Input, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { DataTableFilter } from './models/datatable-filter.model';
import { RList } from './models/response-list.model';
import { IDataTableRender } from './models/datatable-render.model';
import { PaginationType } from './models/pagination-type.model';
import { KeyCode } from './utils/keycode.model';
import { DataTableRow } from './models/datatable-row.model';
import { DataTableColumn } from './models/datatable-column.model';
import { Element } from './utils/element';

@Component({
  selector: 'ui-datatable',
  templateUrl: './ui-datatable.component.html',
  styles: ['./ui-datatable.component.scss']
})
export class UiDatatableComponent implements OnInit, OnChanges, AfterViewInit {

  dataTableFilter: DataTableFilter = new DataTableFilter();

  @ViewChild('tableElement', { static: true })
  public tableElement: HTMLTableElement;

  @ViewChild('inputSearchElement', { static: true })
  public inputSearchElement: HTMLInputElement;

  @ViewChild('itemsPerPageElement', { static: true })
  public itemsPerPageElement: HTMLSelectElement;

  @ViewChild('paginateContainer', { static: true })
  public paginateContainer: HTMLElement;

  @ViewChild('paginateDiv', {static: true})
  public paginateDiv: HTMLElement;

  @ViewChild('paginatePrevBtn', {static: true})
  public paginatePrevBtn: HTMLElement;

  @ViewChild('paginateNextBtn', {static: true})
  public paginateNextBtn: HTMLElement;

  @ViewChild('paginateNextBtn', {static: true})
  public paginatePrepaginateNextBtnvBtn: HTMLElement;

  @Input()
  public enableOrdering = true;

  @Input()
  public showFilter: boolean;

  @Input()
  public showItemsLimit: boolean;

  @Output()
  public searchRequest: EventEmitter<DataTableFilter>;

  @Output()
  public dataRequest: EventEmitter<DataTableFilter>;

  private _orderDir;
  private _isTitlesRendered: boolean;
  private _showCheckboxToSelectRow: boolean;
  private _data: RList<IDataTableRender>;
  public selectedItems: RList<IDataTableRender>;
  private _currentPage: number;
  private _btnQuantity: number;
  public paginationType: PaginationType;
  isLoading: boolean;

  constructor() {
    this._orderDir = 'asc';
    this._isTitlesRendered = false;
    this.showFilter = true;
    this.showItemsLimit = true;
    this._showCheckboxToSelectRow = true;
    this.selectedItems = new RList<IDataTableRender>();
    this._currentPage = 1;
    this._btnQuantity = 5;
    this.paginationType = PaginationType.carousel;
    this.searchRequest = new EventEmitter<DataTableFilter>();
    this.dataRequest = new EventEmitter<DataTableFilter>();
    this.isLoading = true;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.inputSearchElement.addEventListener('keypress', (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.keyCode === KeyCode.ENTER) {
        this.onSearch();
      }
    });
    this.paginatePrevBtn.addEventListener('onclick', this.prevPage);
    this.paginateNextBtn.addEventListener('onclick', this.nextPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  @Input()
  public set showCheckboxSelect(showCBSelect: boolean) {
    this._showCheckboxToSelectRow = showCBSelect;
    this.draw();
  }

  public get showCheckboxSelect(): boolean {
    return this._showCheckboxToSelectRow;
  }

  @Input()
  public set data(data: RList<IDataTableRender>) {
    this._data = data;
  }

  public get data(): RList<IDataTableRender> {
    return this._data;
  }

  public get totalRecords(): number {
    return this._data != null ? this._data.totalRecords : 0;
  }

  public draw() {
    try {
      if (this._data == null || this.data.isEmpty) {
        const tbody = this.tableElement.querySelector('tbody');
        if (tbody !== null) {
          tbody.innerHTML = `<tr><td>Dados indisponiveis</td></tr>`;
        } else {
          const tbody: HTMLTableSectionElement = this.tableElement.createTBody();
          tbody.innerHTML = `<tr><td>Dados indisponiveis</td></tr>`;
        }
      }

      if (this._data !== null) {
        if (this._data.isNotEmpty) {

          let tBody: HTMLTableSectionElement;

          if (this.tableElement.querySelector('tbody') === null) {
            this.tableElement.innerHTML = '';
            this.tableElement.createTBody();
          } else {
            this.tableElement.querySelector('tbody').innerHTML = '';
            tBody = this.tableElement.querySelector('tbody');
          }

          if (this._isTitlesRendered) {
            this._isTitlesRendered = true;
            this.tableElement.createTHead();
            const tableHeaderRow = this.tableElement.tHead.insertRow(-1);

            if (this._showCheckboxToSelectRow) {
              const th = Element.tag('th') as HTMLTableHeaderCellElement;
              th.style.setProperty('text-align', 'left');
              th.attributes['class'] = "datatable-first-col";
              
              const label = Element.tag('label') as HTMLLabelElement;
              label.classList.add('pure-material-checkbox');
              
              const input = new HTMLInputElement();
              //input.type = "checkbox";
              input.addEventListener('onclick', this.onSelectAll);
              const span = Element.tag('span') as HTMLSpanElement;
              
              label.append(input)
              label.append(span);
              th.append(label);
              
              tableHeaderRow.insertAdjacentElement('beforeend', th);
            }

            const columnsTitles: DataTableRow = this._data[0].getRowDefinition();
            columnsTitles.getSets().forEach((col: DataTableColumn) => {
              const th = Element.tag('th');
              th.style.setProperty('text-align', 'left');
              th.attributes['class'] = 'dataTableSorting';
              th.textContent = col.title;

              th.addEventListener('onclick', e => {
                if (this.enableOrdering === true) {
                  this.tableElement.querySelectorAll('th:not(.datatable-first-col)').forEach((el) => {
                    el.attributes['class'] = 'dataTableSorting';
                  });
                  if (this._orderDir === 'asc') {
                    this._orderDir = 'desc';
                    th.attributes['class'] = 'dataTableSorting dataTableSortingDesc';
                  } else if (this._orderDir === 'desc') {
                    this._orderDir = 'asc';
                    th.attributes['class'] = 'dataTableSorting dataTableSortingAsc';
                  }

                  this.dataTableFilter.orderBy = col.key;
                  this.dataTableFilter.orderDir = this._orderDir;
                  this.onRequestData();
                }
              });
              
              tableHeaderRow.insertAdjacentElement('afterend', th);
            });

          }

          for (const item in this._data) {
            const tableRow: HTMLTableRowElement = tBody.insertRow(-1);
            if (this._showCheckboxToSelectRow) {
              const tdcb = Element.tag('td') as HTMLTableDataCellElement;
              tdcb.attributes['class'] = 'datatable-first-col';
              const label = Element.tag('label') as HTMLLabelElement;
              label.addEventListener('onclick', (e) => {
                e.stopPropagation();
              });
              label.classList.add('pure-material-checkbox');
              const input = new HTMLInputElement();
              input.attributes['cbSelect'] = 'true';
              input.addEventListener('onclick', (ev: MouseEvent) => {
                this.onsel
              });
            }
          }


        }
      }
    } catch (e) {
      console.error(e);
    }
    this.isLoading = false;
  }

  onSelectAll(event) {
    const cbs = this.tableElement.querySelectorAll('input[cbselect=true]');
    if (event.target.checked) {
      for (const item: HTMLInputElement in cbs) {
        item.checked = true;
      }
      this.selectedItems.clear();
      this.selectedItems.addAll(this._data);
    } else {
      selectedItems.clear();
      for (CheckboxInputElement item in cbs) {
        item.checked = false;
      }
    }
  }

  public onSearch() {
    this.dataTableFilter.searchString = this.inputSearchElement.value;
    this.searchRequest.emit(this.dataTableFilter);
    this.onRequestData();
  }

  public onRequestData() {
    this.isLoading = true;
    var currentPage = this._currentPage == 1 ? 0 : this._currentPage - 1;
    this.dataTableFilter.offset = currentPage * this.dataTableFilter.limit;
    this.dataRequest.emit(this.dataTableFilter);
  }

  public prevPage(event: Event) {
    if (this._currentPage === 0) {
      return;
    }
    if (this._currentPage > 1) {
      this._currentPage--;
      this.changePage(this._currentPage);
    }
  }

  nextPage(event: Event) {
    if (this._currentPage === this.numPages()) {
      return;
    }
    if (this._currentPage < this.numPages()) {
      this._currentPage++;
      this.changePage(this._currentPage);
    }
  }

  changePage(page) {
    this.onRequestData();
    if (page != this._currentPage) {
      this._currentPage = page;
    }
    this.selectedItems.clear();
  }

  public numPages(): number {
    const totalPages = Math.ceil(this.totalRecords / this.dataTableFilter.limit);
    return totalPages;
  }

  onSelect(event: MouseEvent, item: IDataTableRender) {
    event.stopPropagation();
    let cb: HTMLInputElement = event.target;
    if (cb.checked) {
      if (selectedItems.contains(item) == false) {
        selectedItems.add(item);
      }
    } else {
      if (selectedItems.contains(item)) {
        selectedItems.remove(item);
      }
    }
  }

}
