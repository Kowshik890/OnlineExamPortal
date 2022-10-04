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
  marksGot: any = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  totalMarks: any;
  totalQuestions: any;
  timer: any;

  constructor(private locationStrategy: LocationStrategy, private activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activatedRoute.snapshot.params['id'];
    this.getAllQuestionsForSpecificQuiz();
  }

  getAllQuestionsForSpecificQuiz() {
    this.questionService.getQuestionsofQuizForTest(this.quizId).subscribe((response) => {
      this.questions = response;

      this.timer = this.questions.length * 30;

      /* this.questions.forEach((question: { [x: string]: string; }) => {
        question['givenAnswer'] = '';
      }) */
      this.startTimer();
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
      confirmButtonText: "Submit",
      showCancelButton: true
    }).then((response) => {
      if (response.isConfirmed) {
        this.evalQuiz();
      } else if (response.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    })
  }

  startTimer() {
    let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz() {

    this.questionService.evaluateQuiz(this.questions).subscribe((response: any) => {
      this.marksGot = parseFloat(Number(response.marksGot).toFixed(2));
      this.correctAnswer = response.correctAnswer;
      this.attempted = response.attempted;
      this.isSubmit = true;
    }, (error)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading questions.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
    /* this.questions.forEach((question: { givenAnswer: any; answer: any; }) => {
      if (question.givenAnswer == question.answer) {
        this.correctAnswer++;
        let marksSingle = (this.questions[0].quiz.maxMarks / this.questions.length);
        this.marksGot += marksSingle;
      }

      if (question.givenAnswer.trim() != '') {
        this.attempted++;
      }
    }) */
    this.totalMarks = this.questions[0].quiz.maxMarks;
    this.totalQuestions = this.questions.length;
  }

  print() {
    window.print();
  }
}
