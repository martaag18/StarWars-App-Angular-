import { Component } from '@angular/core';
import { StarshipService } from '../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../shared/interfaces/starship.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-starships',
  imports: [RouterLink],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent {

  private starshipService = inject(StarshipService)

  starships: Starship[] = [];
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadStarships(this.currentPage); //1.Llamamos a la API para obtener las naves
  }

  loadStarships(currentPage: number): void { //2.Ejecutamos método para obtejer respuesta API
    this.starshipService.getStarShips(currentPage).subscribe({
      next: (data) => {
        this.starships = data.results; //Obtenemos respuesta
        console.log(data);
      },
      error: (err) => {
        console.log('Error getting starships from API', err);
      }
    })
  }
}

