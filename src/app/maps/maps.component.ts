import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../controller/model/user.model';
import {UserService} from '../controller/service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ConfirmDialogService} from '../controller/service/confirm-dialog.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AbsenceCreateComponent} from '../absence-create/absence-create.component';
import {UserCreateComponent} from '../user-create/user-create.component';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

declare const google: any;

declare var $: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements  OnInit {


    get user(): User {
        return this.userService.user;
    }

    get users(): Array<User> {
        return this.userService.users;
    }

    constructor(private userService: UserService, private confirmDialogService: ConfirmDialogService, private dialog: MatDialog) {
    }

    ngOnInit() {
        this.userService.findall();
    }


    delete(user: User, index: number) {
        this.confirmDialogService.openConfirmDialog('êtes vous  sure de vouloir supprimer cet employe?').afterClosed().subscribe(res => {
            if (res) {
                this.userService.delete(user, index);
                this.showNotification('top', 'right', 'Employé supprimé avec succès', 'danger');
            }
        });

    }

    showNotification(from, align, msg, type) {


        $.notify({
            icon: "notifications",
            message: msg

        }, {
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

    add() {

        const dialogconfig = new MatDialogConfig();
        dialogconfig.disableClose = true;
        dialogconfig.autoFocus = true;
        dialogconfig.width = "60%";

        this.dialog.open(UserCreateComponent, dialogconfig);
    }
}









