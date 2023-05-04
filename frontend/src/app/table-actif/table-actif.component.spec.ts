import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActifsComponent } from './table-actif.component';

describe('TableActifComponent', () => {
  let component: TableActifsComponent;
  let fixture: ComponentFixture<TableActifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
