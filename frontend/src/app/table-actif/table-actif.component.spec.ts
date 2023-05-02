import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActifComponent } from './table-actif.component';

describe('TableActifComponent', () => {
  let component: TableActifComponent;
  let fixture: ComponentFixture<TableActifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
