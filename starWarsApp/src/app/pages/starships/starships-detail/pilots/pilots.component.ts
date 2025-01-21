import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { StarshipService } from '../../../../core/services/starship.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pilots',
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {

starshipService = inject(StarshipService)

@Input() pilotUrls: string[] = [];
pilots: any[] = []; // Almacena los datos de los pilotos

ngOnInit(): void {
  this.loadPilots(); // Cargar los datos de los pilotos al iniciar el componente
}

private loadPilots(){
  this.pilotUrls.forEach((url) => {
    this.starshipService.getPilotData(url).subscribe({
      next: (data) => {
        this.pilots.push(data);
        console.log(data);
      },
      error: (err) => {
        console.log("Not able to show pilots", err)
      }
    })
  })
}
}


