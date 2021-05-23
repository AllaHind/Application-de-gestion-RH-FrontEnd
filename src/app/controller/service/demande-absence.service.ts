import { Injectable } from '@angular/core';
import {DemandeAbsence} from '../model/demande-absence.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

        constructor(private http: HttpClient) {
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
            return _clone;
        }

        // tslint:disable-next-line:typedef
        public save() {
            if (this.absence.id == null) {
                console.log('hh');
                this.http.post<number>('http://localhost:8036/Demande-absence-Provided/', this.absence).subscribe(
                    data => {

                        if (data > 0) {
                            this.absences.push(this.clone(this.absence));
                            // @ts-ignore
                            this.absence = null;

                        }
                    },
                    error => {

                        console.log('erreur');
                    }
                );
            } else {
                this.http.put<number>('http://localhost:8080/DemandeAbsenceProvided/', this.absence).subscribe(
                    data => {
                        if (data > 0) {

                            this.absences[this._index] = this.clone(this.absence);

                        }
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
            this.http.put<number>('http://localhost:8036/Demande-absence-Provided/', this.absence).subscribe(
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

            this.http.delete<void>('http://localhost:8036/Demande-absence-Provided/id/' + absence.id).subscribe(
                data => {
                    console.log('haha');
                    this.absences.splice(index, 1);

                },
                error => {
                    console.log('erreur')

                }
            )


        }
    }

