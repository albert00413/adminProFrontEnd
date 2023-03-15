import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environments';

const api_url = environment.base_url;

@Pipe({name: 'imagenUrl'})

export class ImagenUrl implements PipeTransform {

  transform(img: string = '', 
            tipo: 'usuarios'|'medicos'|'hospitales') {

    if( img.includes('https') ){
        return img;
    }
    if ( img ) {
        return `${ api_url }/upload/${tipo}/${ img }`;
    } else {
        return `${ api_url }/upload/${tipo}/no-image`;
    }
  }
}