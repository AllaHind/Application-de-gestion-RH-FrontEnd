import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {User} from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    private baseUrl = 'http://localhost:8080';
private _user= new User();
    constructor(private http: HttpClient, private token: TokenStorageService) {
    }
    get user(): User {
        if (this._user == null) {
            this._user = new User();
        }

        return this._user;
    }

    upload(file: File, matricule: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${this.baseUrl}/upload/` + matricule, formData, {
            reportProgress: true,
            responseType: 'json',
        });

        return this.http.request(req);
    }

    getFiles(): Observable<any> {
        // const headers = new HttpHeaders()
        // headers.set('Authorization', 'Bearer ' + this.token);
        return this.http.get(`${this.baseUrl}/files/matricule/` + this.token.getUser().matricule);
    }

    getFile(file): Observable<any> {
        // const headers = new HttpHeaders()
        // headers.set('Authorization', 'Bearer ' + this.token);
        return this.http.get(file.url, {
            responseType: 'arraybuffer'
        });
    }
}
