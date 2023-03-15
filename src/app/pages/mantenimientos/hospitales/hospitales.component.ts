import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { delay, map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenComponent } from '../../../components/modal-imagen/modal-imagen.component';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public hospitales: Hospital[] = [];  
  public hospitalesTemp: Hospital[] = [];  

  public cargando: boolean = true;
  private imgSubs!: Subscription;

  
  constructor( private hospitalService: HospitalService,
               private modalImageService: ModalImagenService,
               private busquedasService: BusquedasService){}
  

  ngOnInit(): void {
    this.cargarHospitales()

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(1000)
    )
    .subscribe( img => this.cargarHospitales())
  }
               
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;

        this.cargando = false;
      })
  }

  guardarCambios(hospital: Hospital){
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success')
      })    
  }
  
  eliminarHospital(hospital: Hospital){

    this.hospitalService.borrarHospital(hospital._id!)
      .subscribe(resp => {
        Swal.fire('Eliminado', hospital.nombre, 'success')
        this.cargarHospitales();
      })    
  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre...',
      showCancelButton: true
    })
    
   if (value!.trim().length > 0) {
     this.hospitalService.crearHospital(value!)
      .subscribe( (resp: any) => {        
        this.hospitales.push(resp.hospital);        
      })
   }    
  }

  abrirModal(hospital: Hospital){

    this.modalImageService.abrirModal('hospitales',hospital._id!,hospital.img);
  }

  buscar(termino: string){

    if ( termino.trim().length === 0 ) {
      this.hospitales = this.hospitalesTemp;
      return;
    }

    this.busquedasService.buscar('hospitales', termino)
        .subscribe(resp =>{
          console.log(resp);
          this.hospitales = resp
        
        })
        
    
  }

}
