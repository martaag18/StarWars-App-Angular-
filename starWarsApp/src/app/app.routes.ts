import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { StarshipsDetailComponent } from './pages/starships/starships-detail/starships-detail.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuardGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    { path: '',
    component: MainLayoutComponent, //Layout con navbar y footer
    children: [
        {path: "", component: HomeComponent},
        { path: "starships", component: StarshipsComponent, canActivate: [AuthGuardGuard]},
        { path: "starships-detail/:id", component: StarshipsDetailComponent, canActivate: [AuthGuardGuard]}
    ]
     }, 
    { path: "",
      component: AuthLayoutComponent, //Layout sin navbar ni footer
      children: [
        { path: "signup", component: SignupComponent},
        { path: "login", component: LoginComponent}

      ]

    }
];
