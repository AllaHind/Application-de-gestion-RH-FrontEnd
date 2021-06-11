import { Component, OnInit } from '@angular/core';
import { AuthService} from '../controller/service/auth.service';
import { TokenStorageService} from '../controller/service/token-storage.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AbsenceCreateComponent} from '../absence-create/absence-create.component';
import {RegisterComponent} from '../register/register.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = 'Username ou mot de passe incorrecte';
    roles: string[] = [];

    constructor(private authService: AuthService, private dialog: MatDialog, private tokenStorage: TokenStorageService,private router: Router) { }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit() {
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
                this.errorMessage = 'Username ou mot de passe incorrect ';
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
    register() {

        const dialogconfig = new MatDialogConfig();
        dialogconfig.disableClose = true;
        dialogconfig.autoFocus = true;
        dialogconfig.width = "40%";

        this.dialog.open(RegisterComponent, dialogconfig);
    }

}


/*
export class LoginComponent implements OnInit {

  login=new Login();
  msg='';
  constructor(private loginService: LoginService,private router: Router,private zone:NgZone) { }
  // tslint:disable-next-line:typedef
  loginUser(){
    this.loginService.loginUser(this.login).subscribe(
        data=>  {
          console.log('data received');
          this.router.navigate(['/dashboard']);


        },
        error=> {
          console.log('error');
          this.msg="Email ou mot de passe incorrect !";
        }
    );
  }
  ngOnInit(): void {
  }

}
*/
