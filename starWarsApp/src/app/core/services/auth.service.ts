import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { inject } from '@angular/core';
import { AppUser } from '../../shared/interfaces/user.interface';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private database = inject(Database);

  constructor() {}

registerUser(user: AppUser): Observable<void> {
  return from(
    createUserWithEmailAndPassword(this.auth, user.email, user.password) 
  ).pipe(
    switchMap((userCredential) => {
      const userId = userCredential.user.uid;
      return this.saveUserToRealtimeDatabase(userId, user);
    })
  );
}

// Guardar datos del usuario en Realtime Database
private saveUserToRealtimeDatabase(userId: string, user: AppUser): Observable<void> {
  const dbRef = ref(this.database, `users/${userId}`);
  return from(
    set(dbRef, {
      name: user.name,
      surname: user.surname,
      email: user.email,
    })
  );
}
}




