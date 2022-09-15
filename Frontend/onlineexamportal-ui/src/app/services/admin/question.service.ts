import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getQuestionsofQuiz(quizId: number) {
    return this.http.get(`${this.baseURL}/api/question/quiz/all/${quizId}`);
  }
}
