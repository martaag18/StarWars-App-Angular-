import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipService } from '../../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../../shared/interfaces/starship.interface';
import { PilotsComponent } from './pilots/pilots.component';
import { FilmsComponent } from './films/films.component';

@Component({
  selector: 'app-starships-detail',
  imports: [PilotsComponent, FilmsComponent],
  templateUrl: './starships-detail.component.html',
  styleUrl: './starships-detail.component.scss'
})
export class StarshipsDetailComponent {

  private route = inject(ActivatedRoute) //servicio de Angular --> Info sobre la ruta activa actual
  private starshipService = inject(StarshipService);

  starship: Starship | undefined;
  isDefaultImage = false;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error("Starship ID not found!");
      return; // Puedes lanzar un error o manejarlo como prefieras
    }
    
    this.starshipService.getStarShipsById(id).subscribe({
      next: (data) => {
        data.name = data.name.toUpperCase(); 
        this.starship = data;
        this.starship.imageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
        console.log("Details starshipw", data);
      },
      error: (err) => {
        console.error("Not able to show details", err);
      }
    })
  }

  setDefaultImage(): void {
    if(this.starship){
      this.starship.imageUrl = "assets/images/default-starship.jpg"
      this.isDefaultImage = true;
    }
  }
}
