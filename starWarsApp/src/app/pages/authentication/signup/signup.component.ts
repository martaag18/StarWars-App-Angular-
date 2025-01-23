import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AppUser } from '../../../shared/interfaces/user.interface';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { inject } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private authService = inject(AuthService);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  submitRegister(): void {
    if (this.registerForm.valid) {
      const user: AppUser = {
        name: this.registerForm.value.name!,
        surname: this.registerForm.value.surname!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        repeatPassword: this.registerForm.value.repeatPassword!,
      };

      if (user.password !== user.repeatPassword) {
        this.errorMessage = 'Passwords do not match!';
      } else {
        this.authService.registerUser(user).subscribe({
          next: () => {
            console.log('User registered successfully');
            this.successMessage = 'User successfully registered!';
            this.errorMessage = null; 
            this.registerForm.reset(); 
          },
          error: (error) => {
            console.error('Error registering user:', error);
            this.errorMessage = this.getFirebaseErrorMessage(error.code); // Maneja el código de error
          }
        });
      }
    }
  }

  private getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please try another one.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use a stronger password.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}


