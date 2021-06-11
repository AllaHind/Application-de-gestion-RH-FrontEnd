import { Component, OnInit } from '@angular/core';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {EmployeService} from '../controller/service/employe.service';
import {TokenStorageService} from '../controller/service/token-storage.service';
import {UserService} from '../controller/service/user.service';
import {User} from '../controller/model/user.model';
import {EquipeService} from '../controller/service/equipe.service';
import {Equipe} from '../controller/model/equipe.model';
declare var $: any;
@Component({
  selector: 'app-absence-create',
  templateUrl: './absence-create.component.html',
  styleUrls: ['./absence-create.component.css']
})
export class AbsenceCreateComponent implements OnInit {
  private currentUser: any;

  constructor(private demandeAbsenceService: DemandeAbsenceService,private userservice:UserService,private token: TokenStorageService ,public dialogref: MatDialogRef<AbsenceCreateComponent>,private equipeService :EquipeService) {
  }
  get user(): User {
    return this.userservice.user;
  }
  get equipes(): Array<Equipe> {
    return this.equipeService.equipes;
  }
  get users(): Array<User> {
    return this.userservice.users;
  }
  get absence(): DemandeAbsence {
    return this.demandeAbsenceService.absence;
  }

  get absences(): Array<DemandeAbsence> {
    return this.demandeAbsenceService.absences;
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

  public saveBr() {
    this.absence.status = 'Brouillon';
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
  set absence(value: DemandeAbsence) {
    this.absence = value;
  }
  get equipe(): Equipe {
    return this.equipeService.equipe;
  }

    ngOnInit(): void {
this.equipeService.findall();
    this.currentUser = this.token.getUser();
    //this.absence.user = this.token.getUser();
   //this.demandeAbsenceService.absence.user.email=this.currentUser.email;
console.log(this.currentUser.email);
  }

}



