import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  cookies = inject(CookieService)

  isLogged(): boolean {
    // Comprueba si el token está presente en las cookies
    return this.cookies.check('token');
  }

  //Cerrar sessión
  isNotLogged(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
