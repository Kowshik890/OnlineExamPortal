import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/admin/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId: number = 0;
  quizTitle: any;
  questions: any = [];

  constructor(private activatedRouter: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.quizId = this.activatedRouter.snapshot.params['id'];
    this.quizTitle = this.activatedRouter.snapshot.params['title'];

    this.questionService.getQuestionsofQuiz(this.quizId).subscribe((response) => {
      this.questions = response;
    }, 
    (error) => {
      console.log(error);
    })
  }

}
