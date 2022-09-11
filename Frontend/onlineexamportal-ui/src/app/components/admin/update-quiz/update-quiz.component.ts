import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';
import { CategoryService } from 'src/app/services/admin/category.service';
import { QuizService } from 'src/app/services/admin/quiz.service';
import { QuizDataService } from 'src/app/services/shareddata/quiz-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  updateQuizForm!: FormGroup;
  quizDTO: any;
  categories: any[] = [];

  constructor(private quizService: QuizService, private sharedQuizData: QuizDataService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.quizDTO = this.sharedQuizData.getQuiz();
    this.updateQuizForm = new FormGroup({
      title: new FormControl(this.quizDTO?.title),
      description: new FormControl(this.quizDTO?.description),
      maxMarks: new FormControl(this.quizDTO?.maxMarks),
      numberOfQuestions: new FormControl(this.quizDTO?.numberOfQuestions),
      active: new FormControl(this.quizDTO?.active),
      category: new FormControl(this.quizDTO?.category.id)
    })
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
    },
    (error: any)=> {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading data.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  updateQuizById() {
    const quizDTO: QuizDTO = {
      title: this.updateQuizForm.get('title')?.value,
      description: this.updateQuizForm.get('description')?.value,
      maxMarks: this.updateQuizForm.get('maxMarks')?.value,
      numberOfQuestions: this.updateQuizForm.get('numberOfQuestions')?.value,
      active: this.updateQuizForm.get('active')?.value,
      category: {
        id: this.updateQuizForm.get('category')?.value
      }
    }

    // update request to the server
    this.quizService.updateQuizById(this.quizDTO?.id, quizDTO).subscribe((response) => {
      this.updateQuizForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Quiz is added successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.router.navigateByUrl("/admin/view-quizzes");
    },
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Server error. Try again later...',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

}
