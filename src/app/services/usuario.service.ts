import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from 'environments/environments';


import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;


  constructor( private http: HttpClient,
               private router: Router) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
      'x-token': this.token
      }
    }
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, this.headers)
        .pipe(
        map((resp:any) => {

          const { email, google, img, nombre, role, uid } = resp.usuario;
          this.usuario = new Usuario( nombre, email, '', img, google, uid, role ); 
          
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError( error =>of(false))
      )


  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
        
      })
    )
    
  }

  actualizarPerfil( data: {nombre:string, email: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
    


  }

  eliminarUsuario(id: string){
    return this.http.delete(`${base_url}/usuarios/${id}`, this.headers)
  }

  actualizarUsuario(usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
  }

  cargarUsuarios( desde: number = 0 ){
    const url = `${base_url}/usuarios?from=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers);  
  }

  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)          
        })
      )
    
  }

  loginGoogle( token: string){
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) => {          
          localStorage.setItem('token', resp.token)          
        })
      )
  }

  logout(){
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
    
    } 

  }






