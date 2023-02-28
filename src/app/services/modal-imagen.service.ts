import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: string = '';
  public id: string = '';
  public img: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( 
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string = ''
    ){
  
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

  }

  
  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }





}