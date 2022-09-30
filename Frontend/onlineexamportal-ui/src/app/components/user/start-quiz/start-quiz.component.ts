import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/admin/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId: any;
  questions: any;

  constructor(private locationStrategy: LocationStrategy, private activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activatedRoute.snapshot.params['id'];
    console.log(this.quizId);
    this.getAllQuestionsForSpecificQuiz();
  }

  getAllQuestionsForSpecificQuiz() {
    this.questionService.getQuestionsofQuizForTest(this.quizId).subscribe((response) => {
      this.questions = response;
      this.questions.forEach((question: { [x: string]: string; }) => {
        question['givenAnswer'] = '';
      })
      console.log((this.questions));
    })
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: "Do you want to submit the quiz?",
      icon: "warning",
      confirmButtonText: "Start",
      showCancelButton: true
    }).then((response) => {
      if(response.isConfirmed) {
          
        } else if (response.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
      }
    })
  }
}
