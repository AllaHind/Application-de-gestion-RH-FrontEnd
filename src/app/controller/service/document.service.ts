import { Injectable } from '@angular/core';
import {Employe} from '../model/employe.model';
import {Document} from '../model/document.model';
import {HttpClient} from '@angular/common/http';
import {DemandeAbsence} from '../model/demande-absence.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
// tslint:disable-next-line:variable-name
  private _document = new Document();
// tslint:disable-next-line:variable-name
  private _documents = new Array<Document>();
  private _index: number;
     totalRecords: any;
    page: Number = 1;

  get document(): Document {
    if (this._document == null) {
      this._document = new Document();
    }

    return this._document;
  }

  set document(value: Document) {
    this._document = value;
  }

  get documents(): Array<Document> {
    if (this._documents == null) {
      this._documents = new Array<Document>();
    }
    return this._documents;
  }

  set documents(value: Array<Document>) {
    this._documents = value;
  }

  constructor(private http: HttpClient) { }
  public clone(document: Document) {

    const _clone = new Document();
    _clone.id = document.id;
    _clone.libelle = document.libelle;
    _clone.dateDemande = document.dateDemande;

    return _clone;
  }
  public save() {
    if (this.document.id == null) {
      console.log('hh');
      this.http.post<number>('http://localhost:8080/Document-Provided/', this.document).subscribe(
          data => {

            if (data > 0) {
              this.documents.push(this.clone(this.document));
              // @ts-ignore
              this.document = null;
              this.iniit();
            }
          },
          error => {

            console.log('erreur');
          }
      );
    } else {
      this.http.put<number>('http://localhost:8080/Document-Provided/', this.document).subscribe(
          data => {
            if (data > 0) {

              this.documents[this._index] = this.clone(this.document);

            }
          }
      );
    }
  }
  updaate() {
    this.http.put<number>('http://localhost:8080/Document-Provided/', this.document).subscribe(
        data => {
          if (data > 0) {

            this.documents[this._index] = this.clone(this.document);

          }
        },
        error => {
          console.log('erreur')

        }
    );
  }
  public iniit() {

    this.http.get<Array<Document>>('http://localhost:8080/Document-Provided/').subscribe(
        data => {
          console.log("haha")
          this._documents= data;
            this.totalRecords = data.length;

        },
        error => {
          console.log("erreur")

        }
    )


  }
  exportTermePdf():Observable<Blob>
  {
 return  this.http.get("http://localhost:8080/Document-Provided/export/pdf", {responseType:'blob'});
  }
    public delete(document: Document, index: number) {

        this.http.delete<void>('http://localhost:8080/Document-Provided/id/' + document.id).subscribe(
            data => {
                console.log('haha');
                this.documents.splice(index, 1);

            },
            error => {
                console.log('erreur')

            }
        )


    }
}
