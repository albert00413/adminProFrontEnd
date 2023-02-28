import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenUrl } from './imageUrl.pipe';



@NgModule({
  declarations: [
    ImagenUrl
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenUrl
  ]
})
export class PipesModule { }
