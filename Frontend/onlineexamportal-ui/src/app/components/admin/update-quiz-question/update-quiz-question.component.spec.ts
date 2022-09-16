import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizQuestionComponent } from './update-quiz-question.component';

describe('UpdateQuizQuestionComponent', () => {
  let component: UpdateQuizQuestionComponent;
  let fixture: ComponentFixture<UpdateQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuizQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
