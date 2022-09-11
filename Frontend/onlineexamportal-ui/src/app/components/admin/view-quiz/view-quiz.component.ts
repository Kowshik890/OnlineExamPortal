import { Component, OnInit } from '@angular/core';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';
import { QuizService } from 'src/app/services/admin/quiz.service';
import { QuizDataService } from 'src/app/services/shareddata/quiz-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quizzes: any[] = [];
  quizDTO: QuizDTO | undefined;

  constructor(private quizService: QuizService, private sharedQuizData: QuizDataService) { }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe((response: any) => {
      this.quizzes = response;
    },
    (error)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading data.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  deleteQuizById(quizId: any, title: any): void {
    Swal.fire({
      title: title,
      text: "Are you sure to delete this quiz?",
      icon: "warning",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((response) => {
      if(response.isConfirmed) {
        this.quizService.deleteQuizById(quizId).subscribe((response) => {
          Swal.fire({
            title: 'Success!!',
            text: 'Quiz has been deleted successfully...',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.getAllQuizzes();
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

  editButtonClicked(quizDTO: QuizDTO) {
    this.quizDTO = quizDTO;
    this.sharedQuizData.setQuiz(this.quizDTO);
  }
}

