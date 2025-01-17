import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarshipService } from '../../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../../shared/interfaces/starship.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starships-detail',
  imports: [CommonModule],
  templateUrl: './starships-detail.component.html',
  styleUrl: './starships-detail.component.scss'
})
export class StarshipsDetailComponent {

  private route = inject(ActivatedRoute) //servicio de Angular --> Info sobre la ruta activa actual
  private starshipService = inject(StarshipService);

  starship: Starship | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.starshipService.getStarShipsById(id).subscribe({
      next: (data) => {
        data.name = data.name.toUpperCase(); 
        this.starship = data;
        console.log(data);
      },
      error: (err) => {
        console.error("Not able to show details", err);
      }
    })
  }

 
}
