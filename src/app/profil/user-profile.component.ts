import { Component, OnInit } from '@angular/core';
import {EmployeService} from '../controller/service/employe.service';
import {DemandeAbsence} from '../controller/model/demande-absence.model';
import {Employe} from '../controller/model/employe.model';
import {TokenStorageService} from '../controller/service/token-storage.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserService} from '../controller/service/user.service';
import {User} from '../controller/model/user.model';
import {UserCreateComponent} from '../user-create/user-create.component';
import {EditProfilComponent} from '../edit-profil/edit-profil.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private employeService:EmployeService,private dialog: MatDialog,private token: TokenStorageService,private httpClient: HttpClient,private userService:UserService) { }
  get employe(): Employe {

    return this.employeService.employe;
  }
    get user(): User {
        return this.userService.user;
    }

    edit() {
        const dialogconfig = new MatDialogConfig();
        dialogconfig.disableClose = true;
        dialogconfig.autoFocus = true;
        dialogconfig.width = "40%";

        this.dialog.open(EditProfilComponent, dialogconfig);
    }

  get employes(): Array<Employe> {
    return this.employeService.employes;
  }
  findEmp(){
    return this.employeService.findEmp();
  }
    findById(){
      return this.userService.findById();
    }
    ngOnInit(): void {
   // this.employeService.findEmp();
        console.log(this.userService.findById())
    this.currentUser = this.token.getUser();
    this.userService.findById();
    console.log(this.user.fullname)
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
              if (response.status === 200) {
                this.message = 'Image uploaded successfully';
              } else {
                this.message = 'Image not uploaded successfully';
              }
            }
        );


  } getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
        .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
        );
  }


}

