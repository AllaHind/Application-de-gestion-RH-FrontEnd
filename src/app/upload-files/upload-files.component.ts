import {Component, OnInit} from '@angular/core';

import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UploadFileService} from '../controller/service/upload-file.service';
import {TokenStorageService} from '../controller/service/token-storage.service';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';

    fileInfos: Observable<any>;
    private currentUser: any;
    private matricule: string;

    constructor(private uploadService: UploadFileService, private token: TokenStorageService) {
    }

    ngOnInit() {
        this.fileInfos = this.uploadService.getFiles();
        this.currentUser = this.token.getUser();

    }


    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        this.progress = 0;

        this.currentFile = this.selectedFiles.item(0);
        this.uploadService.upload(this.currentFile, this.matricule).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
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
        this.uploadService.getFile(file)
    }
}
