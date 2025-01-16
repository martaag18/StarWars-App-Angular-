import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StarshipsComponent } from './pages/starships/starships.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },  // Ruta principal
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent},
    { path: "starships", component: StarshipsComponent}

];
