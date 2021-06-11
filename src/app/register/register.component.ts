import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../controller/service/auth.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {UserService} from '../controller/service/user.service';
import {User} from '../controller/model/user.model';


declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(public dialogref: MatDialogRef<RegisterComponent>, private authService: AuthService,private userService:UserService) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogref.close();
  }





  onSubmit() {
    this.authService.register(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }
  get user(): User {
    return this.userService.user;
  }

// jQuery time

}
