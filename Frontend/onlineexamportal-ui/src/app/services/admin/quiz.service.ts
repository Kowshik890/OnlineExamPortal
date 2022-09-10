import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDTO } from 'src/app/datatransferobject/quiz-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllQuizzes() {
    return this.http.get(`${this.baseURL}/api/quiz/all`);
  }

  addQuiz(addQuizMetaData: QuizDTO): Observable<QuizDTO> {
    return this.http.post<QuizDTO>(`${this.baseURL}/api/quiz/add`, addQuizMetaData);
  }

  deleteQuizById(quizId: any) {
    return this.http.delete(`${this.baseURL}/api/quiz/${quizId}`);
  }
}
