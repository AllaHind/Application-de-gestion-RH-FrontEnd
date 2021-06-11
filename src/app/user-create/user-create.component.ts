import { Component, OnInit } from '@angular/core';
import {UserService} from '../controller/service/user.service';
import {User} from '../controller/model/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../controller/service/auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
   fullname: string;

  get user(): User {
    return this.userService.user;
  }
  get user2(): User {
    return this.userService.user;
  }

  get users(): Array<User> {
    return this.userService.users;
  }

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog, public dialogref: MatDialogRef<UserCreateComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
        data => {
          console.log(data);
          console.log(this.form.emploi);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }



  onClose() {
    this.dialogref.close();
  }

  save() {
    this.userService.save();
  }
}
