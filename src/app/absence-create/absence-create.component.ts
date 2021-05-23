import { Component, OnInit } from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {EmployeService} from '../controller/service/employe.service';
import {TokenStorageService} from '../controller/service/token-storage.service';

@Component({
  selector: 'app-absence-create',
  templateUrl: './absence-create.component.html',
  styleUrls: ['./absence-create.component.css']
})
export class AbsenceCreateComponent implements OnInit {
  private currentUser: any;

  constructor(private demandeAbsenceService: DemandeAbsenceService,private token: TokenStorageService ,public dialogref: MatDialogRef<AbsenceCreateComponent>) {
  }

  get absence(): DemandeAbsence {
    return this.demandeAbsenceService.absence;
  }

  get absences(): Array<DemandeAbsence> {
    return this.demandeAbsenceService.absences;
  }


  // tslint:disable-next-line:typedef

  public saveBr() {
    this.absence.status = 'brouillon';
    this.demandeAbsenceService.save();
    this.onClose();
  }

  public save() {
    this.absence.status = 'En cours de traitement';
    this.demandeAbsenceService.save();
    this.onClose();
  }

  onClose() {
    this.dialogref.close();
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

}



