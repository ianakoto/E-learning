import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaluthomeComponent } from './defaluthome.component';

describe('DefaluthomeComponent', () => {
  let component: DefaluthomeComponent;
  let fixture: ComponentFixture<DefaluthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaluthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaluthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
