import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../services/sweetAlert-service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private sweetAlertService = inject(SweetAlertService);


  public registerForm: FormGroup = this.fb.group({
    email: [ '', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(6)]],
    password: [ '', [Validators.required, Validators.minLength(6)] ],
  });


  register(){

    const {email, name,password} = this.registerForm.value;

    this.authService.register(email,name, password)
    .subscribe( {
      next: () => {
        this.sweetAlertService.Toast.fire({
          icon: 'success' || 'error',
          title: `Usuario, ${name} creado con éxito.` || 'Ha sucedido un error.'
        });
      },
      error: (message) => {
        this.sweetAlertService.Toast.fire({
          icon: 'error',
          title: message.message || 'Ha ocurrido un error.'
        })
      }
    });

  }


}
