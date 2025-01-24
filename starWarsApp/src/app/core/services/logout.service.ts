import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private auth = inject(Auth);
  private router = inject(Router);
  private cookies = inject(CookieService);

  logout(): void {
    signOut(this.auth).then(() => {
      this.cookies.delete('token'); 
      console.log('Log out successful');
      this.router.navigate(["/"]); 
    });
  }
}
