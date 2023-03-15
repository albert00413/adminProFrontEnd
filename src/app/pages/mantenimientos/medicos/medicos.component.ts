import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];  
  public medicosTemp: Medico[] = [];  

  public cargando: boolean = true;
  private imgSubs!: Subscription;
  usuarioService: any;

  
  constructor( private medicoService: MedicoService,
    private modalImageService: ModalImagenService,
    private busquedasService: BusquedasService){}


  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(1000)
    )
    .subscribe( img => this.cargarMedicos())
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  
  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      })
  }

  eliminarMedico(medico: Medico) {

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Está a punto de borrar al usuario: ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico._id!)
          .subscribe( resp => {
            Swal.fire('Eliminado!',`Usuario ${medico.nombre} eliminado correctamente`,'success')
            this.cargarMedicos();
          }, err => {
            Swal.fire('Ups!','Ha ocurrido un error','warning')

          }
          )
      }
    })
  }

  abrirModal(medico: Medico){
    this.modalImageService.abrirModal('medicos',medico._id!,medico.img);
  }

  buscar(termino: string){

    if ( termino.trim().length === 0 ) {
      this.medicos = this.medicosTemp;
      return;
    }

    this.busquedasService.buscar('medicos', termino)
        .subscribe(resp =>{
          console.log(resp);
          this.medicos = resp
        
        })
        
    
  }

}
