import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ImagenUrl } from '../pipes/imageUrl.pipe';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
    ModalImagenComponent,
  ],  
  exports: [
    IncrementadorComponent,
    DonutComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    NgChartsModule,
    PipesModule

  ]
})
export class ComponentsModule { }
