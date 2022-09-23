import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/admin/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId: any;
  quizDTO: any;

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['id'];
    
    this.getQuizDetails();
  }

  getQuizDetails() {
    this.quizService.getQuizById(this.quizId).subscribe((response) => {
      this.quizDTO = response;
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
