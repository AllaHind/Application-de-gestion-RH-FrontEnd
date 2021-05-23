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
    { path: '/icons', title: 'Demande Employe',  icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Table de service',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
    private currentUser: any;

  constructor( private token: TokenStorageService) { }

  ngOnInit() {
      this.currentUser = this.token.getUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return true;
        }
        return true;
    };


}
