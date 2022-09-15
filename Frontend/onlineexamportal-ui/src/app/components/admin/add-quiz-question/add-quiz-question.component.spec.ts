import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizQuestionComponent } from './add-quiz-question.component';

describe('AddQuizQuestionComponent', () => {
  let component: AddQuizQuestionComponent;
  let fixture: ComponentFixture<AddQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
