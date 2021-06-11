import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2,
      fullname:user.fullname,
      date_naissance : user.date_naissance,
      emmploi:user.emmploi,
      dateEmbauche: user.dateEmbauche,
      datechelle:user.datechelle,
      datechelon:   user.datechelon,
      echelle: user.echelle,
      echelon: user.echelon,
      responsable:  user.responsable,
      matricule:  user.matricule,
      uniteOrgani:user.uniteOrgani

    }, httpOptions);
  }
}
