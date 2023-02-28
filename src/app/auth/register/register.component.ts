import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;


  public registerForm = this.fb.group({
    nombre: [ 'Albert', Validators.required ],
    email: [ 'test100@gmail.com', [Validators.required, Validators.email] ],
    password: [ '1234567', Validators.required ],
    password2: [ '1234567', Validators.required ],
    terminos: [ true, Validators.required ]
    
  }, {
    validators: this.passwordsIguales('password', 'password2')
  }) 

  constructor ( private router: Router,
                private fb: FormBuilder,
                private usuarioService: UsuarioService ) {}


  crearUsuario(){

    this.formSubmitted = true
    console.log(this.registerForm.value);
    
    if ( this.registerForm.invalid || !this.registerForm.get('terminos')!.value ) {
      return console.log('formulario invalido');      
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
        console.log('usuario creado')
        console.log(resp)
        
        this.router.navigateByUrl('/');
      }, (err) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error')
      });

  }

  campoNoValido( campo: string ): boolean {

    if (this.registerForm.get(campo)!.invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  invalidPasswords(){
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    if ( (pass1 !== pass2) &&  this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted
  }

  passwordsIguales(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control!.value === pass2Control!.value){
        pass2Control!.setErrors(null);
      } else {
        pass2Control!.setErrors({noEsIgual: true})

      }

    }

  }
}
