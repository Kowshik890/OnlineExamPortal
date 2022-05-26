import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserActive: boolean = false;
  user: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isUserActive = this.userService.isLoggedIn();
    this.user = this.userService.getUser();
    this.userService.loginStatusSubject.asObservable().subscribe(data => {
      this.isUserActive = this.userService.isLoggedIn();
      this.user = this.userService.getUser();
    })
  }

  logout() {
    this.userService.logout();
    window.location.reload();
  }

}
