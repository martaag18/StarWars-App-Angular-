import { Component } from '@angular/core';
import { StarshipService } from '../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../shared/interfaces/starship.interface';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-starships',
  imports: [RouterLink, MatProgressBarModule, InfiniteScrollDirective],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent {

  private starshipService = inject(StarshipService)
  starships: Starship[] = [];
  currentPage: number = 1;
  totalItems = 36; 
  isLoading = false;
  hasMoreData = true;


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadStarships(); 
  }

  loadStarships(): void {

    if(this.isLoading || !this.hasMoreData) return;
    this.isLoading = true;

    this.starshipService.getStarships(this.currentPage).subscribe({
      next: (data) => {
        if(data.results.length === 0){
          this.hasMoreData = false;
        } else {
          this.starships = [...this.starships, ...data.results];
          this.currentPage++
        }

        this.isLoading = false;
    },
    error: (error) => {
      console.error("Error fetching starships", error);
      this.isLoading = false;
    },
  });
}

  onScroll():void{
    this.loadStarships();
  }






}



//     console.log('Loading starships for page:', this.currentPage);
//     this.starshipService.getStarships(this.currentPage).subscribe({
//       next: (data) => {
//         this.starships = [...this.starships, ...data.results]; 
//         console.log('Updated starships:', this.starships);

//         if (this.starships.length >= this.totalItems) {
//           this.allDataLoaded = true;
//         }
//       },
//       error: (err) => {
//         console.log('Error loading starships:', err);
//       }
//     });
//   }

//   onScroll(event: any): void {
//     const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
//     console.log("Scroll detected");
//     if (bottom && !this.isLoading) {
//       this.isLoading = true;
//       this.appendData(); 
//     }
//   }

//   appendData(): void {
//     if (this.starships.length < this.totalItems) {
//       this.currentPage++; 
//       this.loadStarships(); 
//     }
//   }
// }

//scrollHeight - altura total del contenido desplazable (incluidas partes no visibles fuera del scroll)
//scrollTop - distancia desplazada desde parte superior hasta posición actual scroll
//altura visible del contenedor (sin incluir partes desplazadas)

