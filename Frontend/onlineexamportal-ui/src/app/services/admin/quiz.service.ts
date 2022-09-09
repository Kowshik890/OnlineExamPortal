import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
