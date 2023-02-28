import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuarioService: UsuarioService ,
               private busquedasService: BusquedasService,
               private modalImageService: ModalImagenService){}

  ngOnDestroy(): void {
    
    this.imgSubs.unsubscribe();

  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(
        delay(1000)
      )
      .subscribe( img => this.cargarUsuarios())
  }

  get currentUser(){
    return this.usuarioService.uid;
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });   
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string){

    if ( termino.trim().length === 0 ) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedasService.buscar('usuarios', termino)
        .subscribe(resp =>{
          console.log(resp);
          this.usuarios = resp
        
        })
        
    
  }

  eliminarUsuario( usuario: Usuario){

    if( usuario.uid === this.usuarioService.uid){
      Swal.fire('Error','No puede borrarse a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Está a punto de borrar al usuario: ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario.uid!)
          .subscribe( resp => {
            Swal.fire('Eliminado!',`Usuario ${usuario.nombre} eliminado correctamente`,'success')
            this.cargarUsuarios();
          }, err => {
            Swal.fire('Ups!','Ha ocurrido un error','warning')

          }
          )
      }
    })
    


  }

  cambiarRole( usuario: Usuario ){
    
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
        
        
      })
    
  }

  abrirModal(usuario: Usuario) {
    this.modalImageService.abrirModal('usuarios',usuario.uid!,usuario.img);
  }

}
