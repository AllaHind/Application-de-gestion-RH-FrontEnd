import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Login} from '../model/login.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public  loginUser(login: Login): Observable<any>
  {console.log("haha");
    return  this.http.post<any>('http://localhost:8036/Login-Provided/login/ ', login);
  }
}
