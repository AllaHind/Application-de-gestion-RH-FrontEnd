import { Injectable } from '@angular/core';
import {DemandeAbsence} from '../model/demande-absence.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Document} from '../model/document.model';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
    @Injectable({
        providedIn: 'root'
    })
    export class DemandeAbsenceService {

        totalRecords: any;
        page: Number = 1;
        // tslint:disable-next-line:variable-name
        private _absence = new DemandeAbsence();
// tslint:disable-next-line:variable-name
        private _absences = new Array<DemandeAbsence>();
        // tslint:disable-next-line:variable-name
        // @ts-ignore
        private _index: number;
        private approved: number;

        constructor(private http: HttpClient, private token: TokenStorageService) {
        }




        get absence(): DemandeAbsence {
            if (this._absence == null) {
                this._absence = new DemandeAbsence();
            }

            return this._absence;
        }

        set absence(value: DemandeAbsence) {
            this._absence = value;
        }

        get absences(): Array<DemandeAbsence> {
            if (this._absences == null) {
                this._absences = new Array<DemandeAbsence>();
            }
            return this._absences;
        }

        set absences(value: Array<DemandeAbsence>) {
            this._absences = value;
        }

        public clone(demandeAbsence: DemandeAbsence) {

            const _clone = new DemandeAbsence();
            _clone.id = demandeAbsence.id;

            _clone.type = demandeAbsence.type;
            _clone.firstDay = demandeAbsence.firstDay;
            _clone.lastDay = demandeAbsence.lastDay;
            _clone.interim = demandeAbsence.interim;
            _clone.reprise = demandeAbsence.reprise;
            _clone.nombrejours = demandeAbsence.nombrejours;
            _clone.motif = demandeAbsence.motif;
            _clone.status = demandeAbsence.status;
            _clone.user.fullname=demandeAbsence.user.fullname;
            _clone.user.id=demandeAbsence.user.id;
            return _clone;
        }

        // tslint:disable-next-line:typedef
        public save() {
            console.log(this.token.getUser());
            console.log(this.token.getUser().email);
            if (this.absence.id == null) {
                this.absence.user.email = this.token.getUser().email;
                //  this.token.getUser().role
                console.log(this.absence.user)
                this.http.post<number>('http://localhost:8080/DemandeAbsenceProvided/', this.absence).subscribe(
                    data => {

                        if (data > 0) {
                            this.absences.push(this.clone(this.absence));
                            // @ts-ignore
                            this.absence = null;

                        }
                    },
                    error => {

                        console.log(error.message);
                    }
                );
            } else {
                this.http.put<number>('http://localhost:8080/DemandeAbsenceProvided/', this.absence).subscribe(
                    data => {
                        if (data > 0) {

                            this.absences[this._index] = this.clone(this.absence);

                        }
                        this.absence=null;
                    }
                );
            }
        }

        // tslint:disable-next-line:typedef
        public update(index: number, d: DemandeAbsence) {
            this.absence = this.clone(d);
            this._index = index;

        }

        public listAdm() {

            this.http.get<Array<DemandeAbsence>>('http://localhost:8080/DemandeAbsenceProvided/list-adm').subscribe(
                data => {
                    console.log('haha')
                    this._absences = data;

                },
                error => {
                    console.log('erreur')

                }
            )


        }

        updaate() {
            this.http.put<number>('http://localhost:8080/DemandeAbsenceProvided/', this.absence).subscribe(
                data => {
                    if (data > 0) {

                        this.absences[this._index] = this.clone(this.absence);

                    }
                },
                error => {
                    console.log('erreur')

                }
            );
        }

        public init() {

            this.http.get<Array<DemandeAbsence>>('http://localhost:8080/DemandeAbsenceProvided/all').subscribe(
                data => {
                    console.log('haha')

                    this._absences = data;
                    // tslint:disable-next-line:variable-name
                    this.totalRecords = data.length;

                },
                error => {
                    console.log('erreur')

                }
            )


        }

        public delete(absence: DemandeAbsence, index: number) {

            this.http.delete<void>('http://localhost:8080/DemandeAbsenceProvided/id/' + absence).subscribe(
                data => {

                    this.absences.splice(index, 1);

                },
                error => {
                    console.log('erreur')

                }
            )


        }

        findall() {
            this.http.get<Array<DemandeAbsence>>('http://localhost:8080/DemandeAbsenceProvided/id/' + this.token.getUser().id).subscribe(
                data => {
                    console.log('haha')

                    this._absences = data;
                    // tslint:disable-next-line:variable-name
                    this.totalRecords = data.length;
                    console.log(this.absences);
                },
                error => {
                    console.log('erreur')

                }
            )


        }

       public absenceApprouvee() : Observable<any>{
           return  this.http.get<number>('http://localhost:8080/DemandeAbsenceProvided/demande/'+this.token.getUser().id);

       }
       public absenceRejetee() : Observable<any>{
           return  this.http.get<number>('http://localhost:8080/DemandeAbsenceProvided/demandeRejete/'+this.token.getUser().id);

       }
       public absenceEncours() : Observable<any>{
           return  this.http.get<number>('http://localhost:8080/DemandeAbsenceProvided/demandeEncours/'+this.token.getUser().id);

       }

    }


