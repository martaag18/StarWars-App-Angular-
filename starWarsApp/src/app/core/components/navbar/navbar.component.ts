import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/logo/logo.component';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
