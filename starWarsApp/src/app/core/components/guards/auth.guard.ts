import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  
  const auth = inject(Auth); 
  const router = inject(Router); 

  return new Observable<boolean>((observer) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        observer.next(true); 
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); 
        observer.next(false); 
      }
      observer.complete(); 
    });
  });
};




