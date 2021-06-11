import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../controller/service/auth.service';
import {TokenStorageService} from '../controller/service/token-storage.service';
import {Router} from '@angular/router';
import {User} from '../controller/model/user.model';
import {UserService} from '../controller/service/user.service';
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
  isSuccessful = false;
  isSignUpFailed = false;
// For Demo Purpose [Changing input group text on focus]
  form: any = {};
  form2: any = {};

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router,private  userService: UserService) { }


  onSubmit() {
    this.authService.register(this.form2).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = false;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit2() {
        this.authService.login(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                //  this.reloadPage();
                this.router.navigate(['/dashboard']);
            },
            err => {
                this.errorMessage = 'Username ou mot de passe incorrect';
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage() {
        window.location.reload();
    }
    logout() {
        this.tokenStorage.signOut();
        window.location.reload();
    }
    get user(): User {
        return this.userService.user;
    }
}

