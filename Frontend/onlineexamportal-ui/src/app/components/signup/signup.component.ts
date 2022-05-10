import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegisterDTO } from 'src/app/datatransferobject/userRegister-dto';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserForm!: FormGroup;
  submitButtonDisable: boolean = true;

  constructor(private matSnackbar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    this.registerUserForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    })
  }

  registerUser() {
    const userRegisterMetaData: UserRegisterDTO = {
      username: this.registerUserForm.get('username')?.value,
      password: this.registerUserForm.get('password')?.value,
      firstName: this.registerUserForm.get('firstName')?.value,
      lastName: this.registerUserForm.get('lastName')?.value,
      email: this.registerUserForm.get('email')?.value,
      phone: this.registerUserForm.get('phone')?.value,
    }

    this.userService.registerUser(userRegisterMetaData).subscribe(response => {
      this.matSnackbar.open("User registered successfully.", "OK");
    },(error) => {
      this.matSnackbar.open("Something went wrong. Try again.", "OK");
    })
    
  }

  clearFields() {
    this.registerUserForm.reset();
  }

}
