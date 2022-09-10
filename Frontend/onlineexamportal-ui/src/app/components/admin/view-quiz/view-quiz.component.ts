import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/admin/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quizzes: any[] = [];

  constructor(private quizService: QuizService) { }

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
            text: 'Error in deleting category.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }
}

