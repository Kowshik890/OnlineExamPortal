import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/admin/quiz.service';
import { CategoryDataService } from 'src/app/services/shareddata/category-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryId: any;
  allQuizzes: any;
  quizzesOfCategory: any;

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['id'];
      if(this.categoryId == 0) {
        this.getAllQuizzes();
      }
      else {
        console.log("category Id else " + this.categoryId);
        this.quizService.getAllQuizzesForCategory(this.categoryId).subscribe((response) => {
          this.allQuizzes = response;
          console.log("allQuizzes: " + JSON.stringify(this.allQuizzes));
        },(error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Error in loading quizzes.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }

  getAllQuizzes() {
    this.quizService.getAllQuizzesAsc().subscribe((response) => {
      this.allQuizzes = response;
    },
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading quizzes.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

}
