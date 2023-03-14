import { environment } from "environments/environments"

const api_url = environment.base_url;

export class Usuario {

    constructor(
            public nombre: string,
            public email: string,
            public password?: string,
            public img?: string,
            public google?: boolean,
            public uid?: string,
            public role?: string,
    ) {}


    get imagenUrl(){
        //  /upload/usuarios/no-image
        if( this.img?.includes('https') ){
            return this.img;
        }
<<<<<<< HEAD
=======

>>>>>>> origin/master
        if ( this.img ) {
            return `${ api_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ api_url }/upload/usuarios/no-image`;
        }
    }

}
