import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

 public menu: any[] = [];

 cargarMenu(){
  this.menu =  JSON.parse(localStorage.getItem('menu')!) || [];
 }


  // menu: any[] = [
  //   {
  //     titulo: 'Main',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Dashboard', url: '/'},
  //       {titulo: 'ProgressBar', url: '/dashboard/progress'},
  //       {titulo: 'Gráficas', url: '/dashboard/grafica1'},
  //       {titulo: 'Promesas', url: '/dashboard/promesas'},
  //       {titulo: 'Rxjs', url: '/dashboard/rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Médicos', url: 'medicos'},
  //     ]
  //   }
  // ];



  constructor() { }
}
