import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordParentComponent } from './dashbord-parent.component';

describe('DashbordParentComponent', () => {
  let component: DashbordParentComponent;
  let fixture: ComponentFixture<DashbordParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});