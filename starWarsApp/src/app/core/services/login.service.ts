import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from "@angular/fire/auth";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service"; //libreria para manejar cookies en Angular
import { from, Observable, switchMap, tap } from "rxjs"; //libreria con herramientas para trabajar con programación reactiva
import { LogoutService } from "./logout.service";
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth = inject(Auth);
  private router = inject(Router);
  private cookies = inject(CookieService);
  private logoutService = inject(LogoutService)


  //Log In -> Observables -> from (convertir Promise en Observable)
  login(email: string, password: string): Observable<string> {

    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((response: UserCredential) => { //switchMap para encadenar dos pasos (obtener objeto UserCredential + obtener Token)
        console.log("Log in successful", response.user);

        return from(response.user.getIdToken()).pipe(
          tap((token) => { //tap -> acciones adicionales
            this.cookies.set("token", token); 
            console.log("Token", token);
          })
        );
      }),
      tap(() => { 
        this.router.navigate(["/"]); 
      })
    );
  }

   logout(): void {
    this.logoutService.logout()
  }
}

