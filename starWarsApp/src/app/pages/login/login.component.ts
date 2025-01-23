import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginService = inject(LoginService); 

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  
  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; //destructuración para obtener valores del objeto
      this.loginService.login(email!, password!).subscribe({
        next: () => console.log('Login successful'), 
        error: (err) => console.error('Error in log in', err), 
      });
    }
  }
}


