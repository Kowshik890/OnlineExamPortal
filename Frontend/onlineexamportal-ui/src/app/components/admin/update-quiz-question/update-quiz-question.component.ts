import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionDTO } from 'src/app/datatransferobject/question-dto';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';
import { QuestionService } from 'src/app/services/admin/question.service';
import { QuizService } from 'src/app/services/admin/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz-question',
  templateUrl: './update-quiz-question.component.html',
  styleUrls: ['./update-quiz-question.component.css']
})
export class UpdateQuizQuestionComponent implements OnInit {

  updateQuestionForm!: FormGroup;
  questionDTO: QuestionDTO | undefined;
  questionDTOTemp: QuestionDTO | undefined;
  questionId: any;
  questionContent: any;
  quizDTO: any;
  quizId: any;
  quizTitle: any;

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.params['id'];
    this.questionContent = this.activatedRoute.snapshot.params['content'];

    this.questionService.getSingleQuestionById(this.questionId).subscribe((response) => {
      this.questionDTO = response;
      this.questionDTOTemp = this.questionDTO;
      this.formDateInitialization();
      this.getTitleOfQuizByQuizID(this.questionDTO.quiz.id);
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

  formDateInitialization() {
    this.updateQuestionForm = new FormGroup({
      content: new FormControl(this.questionDTOTemp?.content),
      option1: new FormControl(this.questionDTOTemp?.option1),
      option2: new FormControl(this.questionDTOTemp?.option2),
      option3: new FormControl(this.questionDTOTemp?.option3),
      option4: new FormControl(this.questionDTOTemp?.option4),
      answer: new FormControl(this.questionDTOTemp?.answer),
      image: new FormControl(this.questionDTOTemp?.image),
      quiz: new FormControl(this.questionDTOTemp?.quiz.id)
    })
  }

  getTitleOfQuizByQuizID(quizId: any) {
    this.quizService.getQuizById(quizId).subscribe((response) => {
      this.quizDTO = response;
      this.quizId = this.quizDTO.id;
      this.quizTitle = this.quizDTO.title;
    },
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Error in loading data.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  updateQuestion(): void {
    const questionDTO: QuestionDTO = {
      content: this.updateQuestionForm.get('content')?.value,
      option1: this.updateQuestionForm.get('option1')?.value,
      option2: this.updateQuestionForm.get('option2')?.value,
      option3: this.updateQuestionForm.get('option3')?.value,
      option4: this.updateQuestionForm.get('option4')?.value,
      answer: this.updateQuestionForm.get('answer')?.value,
      image: 'image.jpg',
      quiz: {
        id: this.updateQuestionForm.get('quiz')?.value
      }
    }

    console.log("QES: " + JSON.stringify(questionDTO));

    // update request to the server
    this.questionService.updateQuestionById(this.questionId, questionDTO).subscribe((response) => {
      this.updateQuestionForm.reset();
      Swal.fire({
        title: 'Success!!',
        text: 'Question has updated successfully...',
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
