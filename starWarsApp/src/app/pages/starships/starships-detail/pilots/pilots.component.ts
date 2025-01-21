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

private loadPilots(){
  this.pilotUrls.forEach((url) => { //Iteramos pilotUrls para llamar al servicio en cada una de ellas. 
    this.starshipService.getPilotData(url).subscribe({
      next: (data) => {
        this.pilots.push(data);
        console.log("Pilots", data);
      },
      error: (err) => {
        console.log("Not able to show pilots", err)
      }
    })
  })
}
}


