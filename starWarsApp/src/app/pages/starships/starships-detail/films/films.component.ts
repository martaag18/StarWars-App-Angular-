import { Component, Input } from '@angular/core';
import { inject } from '@angular/core';
import { StarshipService } from '../../../../core/services/starship.service';
import { Film } from '../../../../shared/interfaces/film.interface';

@Component({
  selector: 'app-films',
  imports: [],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {

starshipService = inject(StarshipService)

@Input() filmsUrls: string[] = []; 
films: Film[] = []; 


ngOnInit(): void {
  this.loadFilms(); 
}

loadFilms(): void {
  this.filmsUrls.forEach((url) => {
    this.starshipService.getFilmDataById(url).subscribe({
      next: (film) => {
        console.log("Film", film);
        const filmId = this.extractIdFromUrl(url);
        film.imageUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;
        this.films.push(film);
      },
      error: (err) => {
        console.error(`Failed to fetch data for film at ${url}:`, err);
      },
    });
  });
}

  // Extrae el ID del Film desde la URL (recibida desde componente padre)
  private extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
