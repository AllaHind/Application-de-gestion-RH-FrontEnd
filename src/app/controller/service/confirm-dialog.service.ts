import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private matdialog: MatDialog) { }

  openConfirmDialog(msg)
  {
 return this.matdialog.open(ConfirmDialogComponent,{
      width:'390px',
      disableClose:true,
     data:{
          message:msg
     }
    });
  }
}
