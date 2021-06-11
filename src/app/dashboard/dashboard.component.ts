import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {DemandeAbsenceService} from '../controller/service/demande-absence.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private  absenceService: DemandeAbsenceService) { }
  nbrAbsence:number;
  nbrAbsenceRejete:number;
  nbrAbsenceEncours:number;

/*approuved()
{this.absenceService.absenceApprouvee();

}*/

  ngOnInit() {
this.absenceService.absenceApprouvee().subscribe(
    data=>{
      this.nbrAbsence=data;

    },error => {
      console.log(error);
    }
);
this.absenceService.absenceRejetee().subscribe(
    data=>{
      this.nbrAbsenceRejete=data;

    },error => {
      console.log(error);
    }
);
this.absenceService.absenceEncours().subscribe(
    data=>{
      this.nbrAbsenceEncours=data;

    },error => {
      console.log(error);
    }
);

  }

}
