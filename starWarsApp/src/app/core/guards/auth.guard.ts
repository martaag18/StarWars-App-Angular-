import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class AuthGuardGuard implements CanActivate {

  private auth = inject(Auth);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {

      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true); 
          observer.complete();
        } else {
          this.router.navigate(['/login'], 
          { queryParams: { returnUrl: state.url } }); 
          observer.next(false); 
          observer.complete();
        }
      });
      
      return () => unsubscribe();
    });
  }
}






