import { TestBed } from '@angular/core/testing';

import { UiDatatableService } from './ui-datatable.service';

describe('UiDatatableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiDatatableService = TestBed.get(UiDatatableService);
    expect(service).toBeTruthy();
  });
});
