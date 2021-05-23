import { Component, OnInit } from '@angular/core';
import {EmployeService} from '../controller/service/employe.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {Employe} from '../controller/model/employe.model';
import {TokenStorageService} from '../controller/service/token-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  constructor(private employeService:EmployeService,private token: TokenStorageService) { }
  get employe(): Employe {

    return this.employeService.employe;
  }

  get employes(): Array<Employe> {
    return this.employeService.employes;
  }
  findEmp(){
    return this.employeService.findEmp();
  }
  ngOnInit(): void {
   // this.employeService.findEmp();
    this.currentUser = this.token.getUser();
  }





}

