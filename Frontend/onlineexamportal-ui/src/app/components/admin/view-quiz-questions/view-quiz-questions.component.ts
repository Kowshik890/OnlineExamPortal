import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/admin/question.service';
import Swal from 'sweetalert2';

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
    this.getAllQuestionsOfQuiz();
  }

  getAllQuestionsOfQuiz() {
    this.questionService.getQuestionsofQuiz(this.quizId).subscribe((response) => {
      this.questions = response;
    }, 
    (error) => {
      console.log(error);
    })
  }

  deleteQuestionById(questionId: any, content: any): void {
    console.log(questionId);
    Swal.fire({
      title: content,
      text: "Are you sure to delete this question?",
      icon: "warning",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((response) => {
      if(response.isConfirmed) {
        this.questionService.deleteQuestionById(questionId).subscribe((response) => {
          Swal.fire({
            title: 'Success!!',
            text: 'Question has been deleted successfully...',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.getAllQuestionsOfQuiz();
        },(error)=> {
          Swal.fire({
            title: 'Error!',
            text: 'Error in deleting quiz.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }

}
