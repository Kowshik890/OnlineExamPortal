import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDTO } from 'src/app/datatransferobject/question-dto';
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

  addQuestionOfQuiz(addQuestionMetaData: QuestionDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(`${this.baseURL}/api/question/add`, addQuestionMetaData);
  }
}
