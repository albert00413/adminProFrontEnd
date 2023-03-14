import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
<<<<<<< HEAD
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ImagenUrl } from '../pipes/imageUrl.pipe';
import { PipesModule } from '../pipes/pipes.module';
=======
>>>>>>> origin/master



@NgModule({
  declarations: [
    IncrementadorComponent,
<<<<<<< HEAD
    DonutComponent,
    ModalImagenComponent,
  ],  
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalImagenComponent
=======
    DonutComponent
  ],  
  exports: [
    IncrementadorComponent,
    DonutComponent
>>>>>>> origin/master
  ],
  imports: [
    CommonModule,
    FormsModule,    
<<<<<<< HEAD
    NgChartsModule,
    PipesModule

=======
    NgChartsModule
>>>>>>> origin/master
  ]
})
export class ComponentsModule { }
