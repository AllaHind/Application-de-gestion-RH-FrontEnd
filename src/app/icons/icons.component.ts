import { Component, OnInit } from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {DocumentService} from '../controller/service/document.service';
import {Document} from '../controller/model/document.model';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  private _index: number;


  constructor(private demandeAbsenceService: DemandeAbsenceService,private dialog: MatDialog, private confirmDialogService: ConfirmDialogService,private documentService:DocumentService) {
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

    this.demandeAbsenceService.listAdm();
    this.documentService.iniit();
  }

  public accepter(absence:DemandeAbsence) {
    this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir accepter cette demande?").afterClosed().subscribe(res => {
      if (res) {
        this.absence = absence;
        this.absence.status = 'acceptée';
        this.demandeAbsenceService.updaate();
      }
    });
  }
  public refuser(absence:DemandeAbsence) {
      this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir refuser cette demande?").afterClosed().subscribe(res=>{
        if(res)
        {
          this.absence = absence;
          this.absence.status = 'refusée';
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

