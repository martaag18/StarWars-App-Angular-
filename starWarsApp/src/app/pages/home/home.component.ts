import { Component } from '@angular/core';
import { StarshipsComponent } from '../starships/starships.component';

@Component({
  selector: 'app-home',
  imports: [StarshipsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
