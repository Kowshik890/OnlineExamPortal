import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private router: Router) { }

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

  startQuiz() {
    Swal.fire({
      title: "Do you want to start the quiz?",
      icon: "warning",
      confirmButtonText: "Start",
      showCancelButton: true
    }).then((response) => {
      if(response.isConfirmed) {
          this.router.navigate(['/start-quiz/' + this.quizId]);
        } else if (response.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
      }
    })
  }
}
