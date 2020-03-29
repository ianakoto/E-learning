import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclassesComponent } from './manageclasses.component';

describe('ManageclassesComponent', () => {
  let component: ManageclassesComponent;
  let fixture: ComponentFixture<ManageclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
