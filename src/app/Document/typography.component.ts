import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../controller/service/document.service';
import {Document} from '../controller/model/document.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  constructor(private documentService: DocumentService,private dialog: MatDialog, private confirmDialogService: ConfirmDialogService) { }
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
    this.documentService.iniit();
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

}
