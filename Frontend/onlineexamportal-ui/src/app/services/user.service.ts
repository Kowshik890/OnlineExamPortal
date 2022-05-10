import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRegisterDTO } from '../datatransferobject/userRegister-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  registerUser(userRegisterMetaData: UserRegisterDTO): Observable<UserRegisterDTO> {
    return this.httpClient.post<UserRegisterDTO>(`${this.baseURL}/api/user/`, userRegisterMetaData);
  }
}
