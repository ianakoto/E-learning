import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonshomeComponent } from './lessonshome.component';

describe('LessonshomeComponent', () => {
  let component: LessonshomeComponent;
  let fixture: ComponentFixture<LessonshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
