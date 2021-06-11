import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../controller/service/document.service';
import {Document} from '../controller/model/document.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AbsenceCreateComponent} from '../absence-create/absence-create.component';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
declare var $: any;
@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  constructor(private documentService: DocumentService,private confirmDialogService: ConfirmDialogService,public dialogref: MatDialogRef<DocComponent>,private dialog: MatDialog) { }
  get document(): Document {

    return this.documentService.document;
  }
  get documents(): Array<Document> {

    return this.documentService.documents;
  }
  ngOnInit():void {
    this.documentService.findall();
  }
  onClose() {
    this.dialogref.close();
  }
  showNotification(from, align, msg,type){




    $.notify({
      icon: "notifications",
      message: msg

    },{
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
    });
  }
  save()
  {this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir demander ce document?").afterClosed().subscribe(res=>{
    if(res)
    { this.showNotification('top','right','Demande document envoyé','success');
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
}
