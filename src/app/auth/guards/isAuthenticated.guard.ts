import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router  = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated  ) return true;

  if(authService.authStatus() === AuthStatus.checking){
    return false;
  }

  router.navigateByUrl('/auth/login');
  // aplicar el principio DRY un guard se encarga de proteger la ruta
  return false;
    
    //proceso inverso de autentificacion si estoy autenticado no ir al inicio
};
