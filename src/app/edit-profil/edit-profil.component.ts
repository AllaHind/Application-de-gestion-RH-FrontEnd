import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../controller/service/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../controller/model/user.model';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('')


  });
  constructor(private userService: UserService, private dialog: MatDialog, public dialogref: MatDialogRef<EditProfilComponent>)
  {}
  ngOnInit(): void {
  }
  get user(): User {
    return this.userService.user;
  }

  get users(): Array<User> {
    return this.userService.users;
  }
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      email: '',
      password: '',
      username: '',
    });
  }
  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }
  onClose() {
    this.dialogref.close();
  }
  save() {
    this.userService.save();
  }
}
