import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {


  labels1: string[] = [ 'Ventas en descargas', 'Ventas en local', 'Ventas por correo' ];
  data1 = [ 200, 50, 100 ] 
    
  
  
}
