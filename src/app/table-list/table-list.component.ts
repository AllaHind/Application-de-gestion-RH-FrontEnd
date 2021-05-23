import {Component, OnInit, ViewChild} from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {AbsenceCreateComponent} from '../absence-create/absence-create.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    listData:MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private demandeAbsenceService: DemandeAbsenceService, private dialog: MatDialog, private confirmDialogService: ConfirmDialogService) {
  }

  get absence(): DemandeAbsence {
    return this.demandeAbsenceService.absence;
  }

  get absences(): Array<DemandeAbsence> {
    return this.demandeAbsenceService.absences;
  }

  ngOnInit(): void {
    this.demandeAbsenceService.init();
  }


  add() {

    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "60%";

    this.dialog.open(AbsenceCreateComponent, dialogconfig);
  }
  public done() {
    this.absence.status = 'done';
    this.demandeAbsenceService.save();
  }
  public update(index: number, d: DemandeAbsence) {
    this.demandeAbsenceService.update(index, d);
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;

    dialogconfig.width = "60%";
    this.dialog.open(AbsenceCreateComponent, dialogconfig);

  }

 /* public delete(absence: DemandeAbsence, index: number) {
    return this.demandeAbsenceService.delete(absence, index);
  }*/
     delete(absence: DemandeAbsence, index: number) {
       this.confirmDialogService.openConfirmDialog("êtes vous  sure de vouloir supprimer cette demande?").afterClosed().subscribe(res=>{
   if(res)
   {
     this.demandeAbsenceService.delete(absence,index);
   }
           });

  }
}
