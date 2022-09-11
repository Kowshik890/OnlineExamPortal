import { Injectable } from '@angular/core';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {

  quizDTO: QuizDTO | undefined;

  constructor() { }

  setQuiz(quizDTO: QuizDTO) {
    this.quizDTO = quizDTO;
  }

  getQuiz() {
    return this.quizDTO;
  }
}
