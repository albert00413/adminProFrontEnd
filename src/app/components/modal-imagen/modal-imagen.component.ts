import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

 
 constructor( public modalImageService: ModalImagenService,
              private fileUploadService: FileUploadService){}

 public imagenSubir!: File;
 public imgTemp: any = null;



 cerrarModal(){
  this.imgTemp = null;
  this.modalImageService.cerrarModal();
 }

 cambiarImagen(event : any){
  const file: File = event.target.files[0] || undefined;
  this.imagenSubir = file;        

  if ( !file ) {
    this.imgTemp = null;
    return;}

  const reader = new FileReader();
  const url64 = reader.readAsDataURL( file );

  reader.onloadend = () => {

    this.imgTemp = reader.result;
    
  }

}

subirImagen(){

  this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.modalImageService.id)
    .then( img => {
      Swal.fire('Guardado','Imagen de usuario actualizada', 'success');
      this.modalImageService.nuevaImagen.emit(img)

      this.cerrarModal();
      
    }).catch((err) => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');        
    })
    
}

}
