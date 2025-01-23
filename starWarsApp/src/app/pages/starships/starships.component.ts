import { Component } from '@angular/core';
import { StarshipService } from '../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../shared/interfaces/starship.interface';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';




@Component({
  selector: 'app-starships',
  imports: [RouterLink, MatProgressBarModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent {

  private starshipService = inject(StarshipService)
  starships: Starship[] = [];
  currentPage: number = 1;
  totalItems = 36; 
  isLoading = false;
  allDataLoaded = false; 


  ngOnInit(): void {
    this.loadStarships(); 
  }

  loadStarships(): void {
    console.log('Loading starships for page:', this.currentPage);
    this.starshipService.getStarships(this.currentPage).subscribe({
      next: (data) => {
        this.starships = [...this.starships, ...data.results]; 
        console.log('Updated starships:', this.starships);

        if (this.starships.length >= this.totalItems) {
          this.allDataLoaded = true;
        }
      },
      error: (err) => {
        console.log('Error loading starships:', err);
      }
    });
  }

  onScroll(event: any): void {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    console.log("Scroll detected");
    if (bottom && !this.isLoading) {
      this.isLoading = true;
      this.appendData(); 
    }
  }

  appendData(): void {
    if (this.starships.length < this.totalItems) {
      this.currentPage++; 
      this.loadStarships(); 
    }
  }
}

//scrollHeight - altura total del contenido desplazable (incluidas partes no visibles fuera del scroll)
//scrollTop - distancia desplazada desde parte superior hasta posición actual scroll
//altura visible del contenedor (sin incluir partes desplazadas)

