import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnotificationandissueComponent } from './dashboardnotificationandissue.component';

describe('DashboardnotificationandissueComponent', () => {
  let component: DashboardnotificationandissueComponent;
  let fixture: ComponentFixture<DashboardnotificationandissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardnotificationandissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardnotificationandissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
