import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDatatableComponent } from './ui-datatable.component';

describe('UiDatatableComponent', () => {
  let component: UiDatatableComponent;
  let fixture: ComponentFixture<UiDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
