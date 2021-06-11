import { Component, OnInit } from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {DocumentService} from '../controller/service/document.service';
import {Document} from '../controller/model/document.model';
import {TokenStorageService} from '../controller/service/token-storage.service';
import {User} from '../controller/model/user.model';
import {UserService} from '../controller/service/user.service';
import {DocComponent} from '../doc/doc.component';
import {NotificationsComponent} from '../notifications/notifications.component';
import {UploadFileService} from '../controller/service/upload-file.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  private _index: number;
 // private name = this.absence.user.fullname;

  constructor(private demandeAbsenceService: DemandeAbsenceService,private uploadService: UploadFileService,private userservice: UserService ,private token: TokenStorageService,private dialog: MatDialog, private confirmDialogService: ConfirmDialogService,private documentService:DocumentService) {
  }

  get absence(): DemandeAbsence {
    return this.demandeAbsenceService.absence;
  }

  set absence(value: DemandeAbsence) {
    this.demandeAbsenceService.absence = value;
  }

  get absences(): Array<DemandeAbsence> {
    return this.demandeAbsenceService.absences;
  }
  get users(): Array<User> {
    return this.userservice.users;
  }
  get user(): User {
    return this.userservice.user;
  }
  get document(): Document {
    return this.documentService.document;
  }

  set document(value: Document) {
    this.documentService.document = value;
  }

  get documents(): Array<Document> {
    return this.documentService.documents;
  }
  public clone(demandeAbsence: DemandeAbsence){
    return this.demandeAbsenceService.clone(demandeAbsence);
  }


  ngOnInit(): void {


this.userservice.findall();
    this.documentService.iniit();
    this.demandeAbsenceService.listAdm();
  }

  add() {

    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "60%";

    this.dialog.open(NotificationsComponent, dialogconfig);
  }

  public accepter(absence:DemandeAbsence) {
    this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir accepter cette demande?").afterClosed().subscribe(res => {
      if (res) {
        this.absence = absence;
        this.absence.status = 'Approuvée';
        this.demandeAbsenceService.updaate();
      }
    });
  }
  public refuser(absence:DemandeAbsence) {
      this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir refuser cette demande?").afterClosed().subscribe(res=>{
        if(res)
        {
          this.absence = absence;
          this.absence.status = 'Rejetée';
          this.demandeAbsenceService.updaate();
        }
      });
  }
 documentPret(document:Document)
 {
   this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir accepter cette demande?").afterClosed().subscribe(res => {
     if (res) {
       this.document = document;
       this.document.status = 'prêt';
       this.documentService.updaate();
     }
   });
 }


}

