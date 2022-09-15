import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionDTO } from 'src/app/datatransferobject/question-dto';
import { QuestionService } from 'src/app/services/admin/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz-question',
  templateUrl: './add-quiz-question.component.html',
  styleUrls: ['./add-quiz-question.component.css']
})
export class AddQuizQuestionComponent implements OnInit {

  quizId: number = 0;
  quizTitle: any;
  addQuestionForm!: FormGroup;
  questionDTO: QuestionDTO | undefined;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['id'];
    this.quizTitle = this.activatedRoute.snapshot.params['title'];
    this.formDataInitialization();
  }

  formDataInitialization(): void {
    this.addQuestionForm = new FormGroup({
      content: new FormControl(''),
      option1: new FormControl(''),
      option2: new FormControl(''),
      option3: new FormControl(''),
      option4: new FormControl(''),
      answer: new FormControl('')
    })
  }

  addQuestion():void {
    const questionDTO: QuestionDTO = {
      content: this.addQuestionForm.get('content')?.value,
      option1: this.addQuestionForm.get('option1')?.value,
      option2: this.addQuestionForm.get('option2')?.value,
      option3: this.addQuestionForm.get('option3')?.value,
      option4: this.addQuestionForm.get('option4')?.value,
      answer: this.addQuestionForm.get('answer')?.value,
      image: this.addQuestionForm.get('')?.value,
      quiz: {
        id: this.quizId
      }
    }
    console.log("Question: " + JSON.stringify(questionDTO));
    this.questionService.addQuestionOfQuiz(questionDTO).subscribe((response) => {
      this.addQuestionForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Question is added successfully...',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.router.navigate(['/admin/view-quiz-questions', this.quizId, this.quizTitle]);
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
