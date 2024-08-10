import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { SweetAlertService } from '../../services/sweetAlert-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {


  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private sweetAlertService = inject(SweetAlertService);

  private router  = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email: [ 'dylan@gmail.com', [Validators.required, Validators.email]],
    password: [ '', [Validators.required, Validators.minLength(6)] ],
  });


  login() {
    const {email,password} = this.myForm.value;
    this.authService.login( email, password)
    .subscribe(  {
      next : ( ) => {
        this.sweetAlertService.Toast.fire({
          icon: 'success' || 'error',
          title: 'Login exitoso!' || 'Ha sucedido un error.'
        });
        this.router.navigateByUrl('/dashboard')

      },
      error: (message) => {
        this.sweetAlertService.Toast.fire({
          icon: 'error',
          title: message.message || 'Ha ocurrido un error.'

        })
      }
    } )
  }


}
