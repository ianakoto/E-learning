import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasshomeComponent } from './classhome.component';

describe('ClasshomeComponent', () => {
  let component: ClasshomeComponent;
  let fixture: ComponentFixture<ClasshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
