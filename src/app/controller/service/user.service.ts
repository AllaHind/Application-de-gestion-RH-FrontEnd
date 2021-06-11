import { Injectable } from '@angular/core';
import {Employe} from '../model/employe.model';
import {User} from '../model/user.model';
import {DemandeAbsence} from '../model/demande-absence.model';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  totalRecords: any;
  page: Number = 1;


  // tslint:disable-next-line:variable-name
  private _user = new User();
// tslint:disable-next-line:variable-name
  private _users = new Array<User>();
    private _index: number;

  constructor(private http: HttpClient, private token: TokenStorageService) {

  }

  public in() {
    this.user = new User();
    console.log()
  }

  get user(): User {
    if (this._user == null) {
      this._user = new User();
    }

    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get users(): Array<User> {
    if (this._users == null) {
      this._users = new Array<User>();
    }
    return this._users;
  }

  set users(value: Array<User>) {
    this._users = value;
  }

  findall() {
    this.http.get<Array<User>>('http://localhost:8080/api/auth/findall/').subscribe(
        data => {
          console.log('haha')

          this._users = data;
          // tslint:disable-next-line:variable-name
          this.totalRecords = data.length;

        },
        error => {
          console.log('erreur')

        }
    )


  }

  public delete(user: User, index: number) {

    this.http.delete<void>('http://localhost:8080/api/auth/id/' + user.id).subscribe(
        data => {

          this.users.splice(index, 1);

        },
        error => {
          console.log('erreur')

        }
    )


  }

  public save() {
    if (this.user.id == null) {
      //  this.token.getUser().role
      this.http.post<number>('http://localhost:8080/api/auth/signup/', this.user).subscribe(
          data => {

            if (data > 0) {
              // this.absences.push(this.clone(this.absence));
              // @ts-ignore
              this.user = null;

            }
          },
          error => {

            console.log(error.message);
          }
      );
    }
    else {
        this.http.put<number>('http://localhost:8080/api/auth/signup/', this.user).subscribe(
            data => {
                if (data > 0) {

                   console.log("updatetd");

                }

            }
        );
    }


  }
    public update(index: number, u: User) {
        this.user = this.clone(u);
        this._index = index;

    }
    public clone(user: User) {

        const _clone = new User();
        _clone.id =user.id;
        _clone.email =user.email;
        _clone.password =user.password;
        _clone.username =user.username;
        _clone.password2 =user.password2;

        return _clone;
    }
    findById() {
        this.http.get<User>('http://localhost:8080/api/auth/id/'+this.token.getUser().id).subscribe(
            data => {
                this._user= data;
                console.log('khdmat')
            },
            error => {
                console.log('erreur')

            }
        )


    }
}
