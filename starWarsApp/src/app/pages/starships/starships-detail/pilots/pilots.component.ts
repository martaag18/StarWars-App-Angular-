import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { StarshipService } from '../../../../core/services/starship.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pilots',
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {

starshipService = inject(StarshipService)

@Input() pilotUrls: string[] = []; //Recibimos del componente padre array pilotos
pilots: any[] = []; 

ngOnInit(): void {
  this.loadPilots(); 
}

loadPilots(): void {
  this.pilotUrls.forEach((url) => {
    this.starshipService.getPilotDataById(url).subscribe({
      next: (pilot) => {
        const pilotId = this.extractIdFromUrl(url);
        pilot.imageUrl = `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;
        this.pilots.push(pilot);
      },
      error: (err) => {
        console.error(`Failed to fetch data for pilot at ${url}:`, err);
      },
    });
  });
}

  // Extrae el ID del piloto desde la URL
  private extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2]; // El ID está justo antes del último '/'
  }

}



