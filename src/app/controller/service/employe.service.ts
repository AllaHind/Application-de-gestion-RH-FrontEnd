import { Injectable } from '@angular/core';
import {DemandeAbsence} from '../model/demande-absence.model';
import {Employe} from '../model/employe.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  public  _emp=new Array<Employe>();
  // tslint:disable-next-line:variable-name
  private _employe = new Employe();
// tslint:disable-next-line:variable-name
  private _employes = new Array<Employe>();

  get employe(): Employe {
    if (this._employe == null) {
      this._employe = new Employe();
    }

    return this._employe;
  }

  set employe(value: Employe) {
    this._employe = value;
  }

  get employes(): Array<Employe> {
    if (this._employes == null) {
      this._employes = new Array<Employe>();
    }
    return this._employes;
  }

  set employes(value: Array<Employe>) {
    this._employes = value;
  }

  constructor(private http: HttpClient) {
  }

  public findEmp() {
    console.log("correct")
    this.http.get<Employe>('http://localhost:8036/Employe-Provided/emp').subscribe(
        data => {
          this.employe=data;
          console.log(data);
        },
        error => {
          console.log("erreur");
        }
    )
  }
  }

