import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../controller/service/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {TokenStorageService} from '../controller/service/token-storage.service';
import {User} from '../controller/model/user.model';
import {UserService} from '../controller/service/user.service';
import {FileDB} from '../controller/model/file-db.model';
import {MatDialogRef} from '@angular/material/dialog';

declare var $: any;

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';
matricule:string;
    fileInfos: Observable<any>;
    private currentUser: any;

    private _file = new FileDB();

    constructor(private uploadService: UploadFileService,public dialogref: MatDialogRef<NotificationsComponent>, private token: TokenStorageService,private  userservice: UserService) {
    }

    ngOnInit() {
        this.fileInfos = this.uploadService.getFiles();
        this.currentUser = this.token.getUser();


    }

    get users(): Array<User> {
        return this.userservice.users;
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }
    get user(): User {
        return this.userservice.user;
    }
    get filedb(): FileDB {
        if (this._file == null) {
            this._file = new FileDB();
        }
        return this._file;
    }
    onClose() {
        this.dialogref.close();
    }

    upload() {
        this.progress = 0;

        this.currentFile = this.selectedFiles.item(0);
        this.uploadService.upload(this.currentFile, this.filedb.user.matricule).subscribe(
            event => {

                if (event.type === HttpEventType.UploadProgress) {
                    console.log(this.filedb.user.matricule)
                    this.progress = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.message = event.body.message;
                    this.fileInfos = this.uploadService.getFiles();
                }
            },
            err => {
                this.progress = 0;
                this.message = 'Could not upload the file!';
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }

    downloadFile(file: any) {
        this.uploadService.getFile(file).subscribe(
            data => {
                // tslint:disable-next-line:prefer-const
                let blob = new Blob([data], {type: file.type})
                const url = window.URL.createObjectURL(blob)
                //  const win = window.open(url)
                const anchor = document.createElement('a')
                anchor.href = url;
                anchor.download = file.name;
                anchor.click()
            },
            err => {
                console.log(err)
            });
    }
}
