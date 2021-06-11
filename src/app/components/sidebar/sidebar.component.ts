import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../controller/service/token-storage.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/profil', title: 'Mon Profil',  icon: 'person', class: '' },
    { path: '/table-list', title: 'Mes demandes',  icon: 'content_paste', class: '' },
    { path: '/Document', title: 'Mes Document',  icon: 'library_books', class: '' },

    { path: '/maps', title: 'Employés',  icon: 'location_on', class: '' },
    { path: '/icons', title: 'Demande Employe',  icon: 'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/absence-create', title: 'Notifications',  icon: 'notifications', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
    private currentUser: any;
    newMenuItems: Array<any>;
  constructor( private token: TokenStorageService) { }
/*
    public filteritems(){
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        console.log(this.menuItems);
        for (let i=0;this.menuItems.length;i++){
            if (this.menuItems[i]=="Demande Employe" && this.currentUser.roles[0]=="ROLE_USER"){
                continue;
            }


        }
        console.log(this.newMenuItems);

    }*/


    public filteritems(){
        let curr=this.currentUser[0];
        console.log("**curr**");
        console.log(this.currentUser.roles[0]);
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (this.currentUser.roles[0]=="ROLE_USER"){
            // tslint:disable-next-line:triple-equals
            this.menuItems = ROUTES.filter(menuItem =>(menuItem.title!="Demande Employe" && menuItem.title!="Employés"));
            console.log("**************");
            console.log(this.menuItems);
        }
    }

  ngOnInit() {
      this.currentUser = this.token.getUser();
      console.log(this.token.getUser());
   /* this.menuItems = ROUTES.filter(menuItem => menuItem);*/
     this.filteritems();


  }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return true;
        }
        return true;
    };


}
