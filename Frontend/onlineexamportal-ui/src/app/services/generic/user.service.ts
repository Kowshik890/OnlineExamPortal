import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, Subject } from 'rxjs';
import { UserLoginDTO } from 'src/app/datatransferobject/userLogin-dto';
import { UserRegisterDTO } from 'src/app/datatransferobject/userRegister-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.apiBaseUrl;
  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  registerUser(userRegisterMetaData: UserRegisterDTO): Observable<UserRegisterDTO> {
    return this.httpClient.post<UserRegisterDTO>(`${this.baseURL}/api/user/`, userRegisterMetaData);
  }

  generateToken(userLoginCredentials: UserLoginDTO) {
    return this.httpClient.post(`${this.baseURL}/generate-token`, userLoginCredentials);
  }

  // login user: set token in localStorage (if we close the browser, still data will present)
  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // isLoggedIn: user is logged in or not
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout: remove token from localStorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get current user which is logged in
  getCurrentUser() {
    return this.httpClient.get(`${this.baseURL}/current-user`);
  }

  // get token when needed
  getToken() {
    return localStorage.getItem('token');
  }

  // set user details to localStorage (not to hit db everytime for username password)
  setUser(user: UserLoginDTO) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user details from localStorage 
  getUser() {
    let user = localStorage.getItem('user');
    if(user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority; // or user.authorities; (return as list)
  }
}
