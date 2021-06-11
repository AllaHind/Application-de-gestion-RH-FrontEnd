import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../controller/service/document.service';
import {Document} from '../controller/model/document.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {DocComponent} from '../doc/doc.component';
import {UploadFileService} from '../controller/service/upload-file.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

    fileInfos: Observable<any>;
    currentDate = new Date();
  constructor(private documentService: DocumentService,private uploadService:UploadFileService,private dialog: MatDialog, private confirmDialogService: ConfirmDialogService) { }
  get document(): Document {

    return this.documentService.document;
  }
  get documents(): Array<Document> {

    return this.documentService.documents;
    }

save()
{this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir demander ce document?").afterClosed().subscribe(res=>{
    if(res)
    {
        this.documentService.save();
    }
});

}
    delete(document: Document, index: number) {
        this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir supprimer ce document?").afterClosed().subscribe(res=>{
            if(res)
            {
                this.documentService.delete(document,index);
            }
        });

    }

  ngOnInit():void {
    this.documentService.findall();
      this.fileInfos = this.uploadService.getFiles();
  }
  exportTermePdf(){
     this.documentService.exportTermePdf().subscribe(x=>{
      const blob=new Blob([x],{type:'application/pdf'});
      if(window.navigator && window.navigator.msSaveOrOpenBlob)
      {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
        }

      const data=window.URL.createObjectURL(blob);
      const  link=document.createElement('a');
      link.href=data;
      link.download='attestation.pdf';
      link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      setTimeout(function (){
        window.URL.revokeObjectURL(data);
        link.remove();
      },100);
        }

    );
  }
    add() {

        const dialogconfig = new MatDialogConfig();
        dialogconfig.disableClose = true;
        dialogconfig.autoFocus = true;
        dialogconfig.width = "40%";

        this.dialog.open(DocComponent, dialogconfig);
    }
    lire(file: any) {
        this.uploadService.getFile(file).subscribe(
            data => {
                // tslint:disable-next-line:prefer-const
                let blob = new Blob([data], {type: file.type})
                const url = window.URL.createObjectURL(blob)
                 const win = window.open(url)

            },
            err => {
                console.log(err)
            });
    }
    downloadFile(file: any) {
        this.uploadService.getFile(file).subscribe(
            data => {
                // tslint:disable-next-line:prefer-const
                let blob = new Blob([data], {type: file.type})
                const url = window.URL.createObjectURL(blob)
                 // const win = window.open(url)
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

