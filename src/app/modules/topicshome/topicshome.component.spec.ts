import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicshomeComponent } from './topicshome.component';

describe('TopicshomeComponent', () => {
  let component: TopicshomeComponent;
  let fixture: ComponentFixture<TopicshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
