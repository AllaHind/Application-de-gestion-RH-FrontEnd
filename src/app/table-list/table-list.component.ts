import {Component, OnInit, ViewChild} from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {AbsenceCreateComponent} from '../absence-create/absence-create.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../controller/service/user.service';

declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    listData:MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private demandeAbsenceService: DemandeAbsenceService, private dialog: MatDialog, private confirmDialogService: ConfirmDialogService,private userService:UserService) {
  }


  get absence(): DemandeAbsence {
    return this.demandeAbsenceService.absence;
  }

  get absences(): Array<DemandeAbsence> {
    return this.demandeAbsenceService.absences;
  }

  ngOnInit(): void {
    console.log(this.demandeAbsenceService.findall())
    this.demandeAbsenceService.findall();
    this.userService.in();
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

 /* public delete(absence: DemandeAbsence, index: number) {
    return this.demandeAbsenceService.delete(absence, index);
  }*/
     delete(absence:DemandeAbsence, index: number) {
       this.confirmDialogService.openConfirmDialog('êtes vous  sure de vouloir supprimer cette demande?').afterClosed().subscribe(res=>{
   if(res)
   {
     this.demandeAbsenceService.delete(absence,index);
     this.showNotification('top','right', 'Demande d\'absence supprimée','danger');
   }
           });

  }
}
