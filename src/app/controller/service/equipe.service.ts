import { Injectable } from '@angular/core';
import {Employe} from '../model/employe.model';
import {Equipe} from '../model/equipe.model';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private  http: HttpClient) {
  }

  private _equipe = new Equipe();
// tslint:disable-next-line:variable-name
  private _equipes = new Array<Equipe>();

  get equipe(): Equipe {
    if (this._equipe == null) {
      this._equipe = new Equipe();
    }

    return this._equipe;
  }

  set equipe(value: Equipe) {
    this._equipe = value;
  }

  get equipes(): Array<Equipe> {
    if (this._equipes == null) {
      this._equipes = new Array<Equipe>();
    }
    return this._equipes;
  }

  set equipes(value: Array<Equipe>) {
    this._equipes = value;
  }

  findall() {
    this.http.get<Array<Equipe>>('http://localhost:8080/Equipe/').subscribe(
        data => {
          console.log('haha')

          this._equipes = data;
          // tslint:disable-next-line:variable-name
          //this.totalRecords = data.length;

        },
        error => {
          console.log('erreur')

        }
    )

  }
}
