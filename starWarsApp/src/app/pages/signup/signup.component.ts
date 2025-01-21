import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/logo/logo.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [LogoComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),

  });

  submitRegister(): void {
    if(this.registerForm.valid){
      const user: User = {
        name: this.registerForm.value.name!,
        surname: this.registerForm.value.surname!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        repeatPassword: this.registerForm.value.repeatPassword!,

      };
      console.log("user created", user);
    }
  }

}
