import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {


  private authService = inject( AuthService );

  // las propiedades computadas sirven como lectura.
  public user = computed(()=> this.authService.currentUser());

  // public userData = structuredClone(this.user);

  onLogOut(){
    this.authService.onLogOut();
  }
  // get user() {
  //   return this.authService.currentUser();
  // }

}
