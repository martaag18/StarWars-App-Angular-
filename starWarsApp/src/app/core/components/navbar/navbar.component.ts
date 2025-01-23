import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  loginService = inject(LoginService); 
  router = inject(Router); 

  isLogged(): boolean {
    // Comprueba si el token está presente en el servicio o cookies
    return this.loginService.token !== null && this.loginService.token !== undefined;
  }

    //Cerrar sessión 

    isNotLogged(): void {
      this.loginService.logout(); 
      this.router.navigate(['/']); 
    }

}
