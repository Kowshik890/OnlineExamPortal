import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO } from 'src/app/datatransferobject/userLogin-dto';
import { UserService } from 'src/app/services/generic/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { 
    this.loginUserForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  loginUser() {
    const userLoginCredentials: UserLoginDTO = {
      username: this.loginUserForm.get('username')?.value,
      password: this.loginUserForm.get('password')?.value
    }
    // request to server to generate token
    this.userService.generateToken(userLoginCredentials).subscribe((response: any) => {
      console.log("Success!!");
      console.log("Token: " + response.token);
      this.userService.loginUser(response.token);
      this.userService.getCurrentUser().subscribe((user: any) => {
        this.userService.setUser(user);
        console.log(user);
        // redirect to admin dashboard
        // redirect to user dashboard
        if(this.userService.getUserRole() == "ADMIN") {
          this.router.navigateByUrl("/admin");
          this.userService.loginStatusSubject.next(true);
          //window.location.href = '/admin';
        } else if(this.userService.getUserRole() == "USER") {
          this.router.navigateByUrl("/user");
          this.userService.loginStatusSubject.next(true);
          //window.location.href = '/user';
        } else {
          this.userService.logout();
        }
      })
    },
    (error)=> {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Invalid Username or Password. Try again please.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  clearFields() {
    this.loginUserForm.reset();
  }

}
