import {Component, Inject, inject, OnInit} from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private demandeAbsenceService: DemandeAbsenceService,public dialogref:MatDialogRef<ConfirmDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  public delete(absence:DemandeAbsence,index: number) {
    return this.demandeAbsenceService.delete(absence, index);
  }
  onClose() {
    this.dialogref.close(false);
  }
}

