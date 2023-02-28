import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  loginForm: FormGroup;

  constructor ( private router: Router,
               private fb : FormBuilder,
               private usuarioService: UsuarioService) {
  this.loginForm = this.fb.group({
  email: [ localStorage.getItem('email')|| '', [Validators.required, Validators.email] ],
  password: [ '', Validators.required ],
  remember: [false]
  })}

  ngAfterViewInit(): void {
    this.googleInit();
  }
  
  googleInit(){
    google.accounts.id.initialize({
      client_id: '503895453013-5nf93qm1al6abuunuljihci8qrhuigmu.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large", }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    this.usuarioService.loginGoogle(response.credential)
      .subscribe( resp => {
        console.log(resp);
         this.router.navigateByUrl('/');
      })
      
     
  }

  login(){
    
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        if (this.loginForm.get('remember')!.value)
        {
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        } else {
          localStorage.removeItem('email');
        }
        
        this.router.navigateByUrl('/');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

 


}
