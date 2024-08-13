import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject( AuthService );
  private router = inject(Router);


  public finishedAuthCheck = computed<boolean>( () => {
    if( this.authService.authStatus() === AuthStatus.checking) {
      // this.router.navigateByUrl('/auth/register');
      return false;
    };
    return true;
  });



  public authStatusChangedEffect = effect(() => {

    switch( this.authService.authStatus() ){

      case AuthStatus.checking:
        this.router.navigateByUrl('/auth/register');
        return false;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return true;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        return false;
    }
  })

}
