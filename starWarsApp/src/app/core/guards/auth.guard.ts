import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        observer.next(true); 
        observer.complete(); 
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); 
        observer.next(false); 
        observer.complete(); 
      }
    });

    return () => unsubscribe(); //auth.onAuthStateChanged devuelve una función de tipo Unsubscribe --> llamar para detener listener /creado en onAuthStateChanged de Firebase que escucha cambios autenticacion)
  });
};





