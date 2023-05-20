import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLocataireComponent } from './dashboard-locataire.component';

describe('DashboardLocataireComponent', () => {
  let component: DashboardLocataireComponent;
  let fixture: ComponentFixture<DashboardLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLocataireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
