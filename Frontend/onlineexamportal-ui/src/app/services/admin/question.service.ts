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

  deleteQuestionById(questionId: any) {
    return this.http.delete(`${this.baseURL}/api/question/${questionId}`);
  }

  getSingleQuestionById(questionId: any): Observable<QuestionDTO> {
    return this.http.get<QuestionDTO>(`${this.baseURL}/api/question/${questionId}`);
  }

  updateQuestionById(questionId: any, questionDTO: QuestionDTO) {
    return this.http.put<QuestionDTO>(`${this.baseURL}/api/question/${questionId}`, questionDTO);
  }
}
