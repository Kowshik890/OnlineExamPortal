import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';
import { CategoryService } from 'src/app/services/admin/category.service';
import { QuizService } from 'src/app/services/admin/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  addQuizForm!: FormGroup;
  categories: any[] = [];

  constructor(private categoryService: CategoryService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.formDataInitialization();
  }

  formDataInitialization(): void {
    this.addQuizForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      maxMarks: new FormControl(''),
      numberOfQuestions: new FormControl(''),
      active: new FormControl(''),
      category: new FormControl('')
    })
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
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

  addQuiz() {
    const quizDTO: QuizDTO = {
      title: this.addQuizForm.get('title')?.value,
      description: this.addQuizForm.get('description')?.value,
      maxMarks: this.addQuizForm.get('maxMarks')?.value,
      numberOfQuestions: this.addQuizForm.get('numberOfQuestions')?.value,
      active: this.addQuizForm.get('active')?.value,
      category: {
        id: this.addQuizForm.get('category')?.value
      }
    }

    // add request to the server
    this.quizService.addQuiz(quizDTO).subscribe((response) => {
      this.addQuizForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Quiz is added successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
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
