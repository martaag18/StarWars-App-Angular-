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
  isLoading = false;
  hasMoreData = true;


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadStarships(); 
  }

  loadStarships(): void {

    this.isLoading = true;

    if(this.isLoading || !this.hasMoreData) {
      this.starshipService.getStarships(this.currentPage).subscribe({
        next: (data) => {
          console.log("Data results", data.results.length)
          if(data.results.length === 0){
            this.hasMoreData = false;
          } else {
            this.starships = [...this.starships, ...data.results];
            this.currentPage++
          }
          console.log("Starships logged", this.starships.length);
          this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching starships", error);
        this.isLoading = false;
      },
    });
   }
  }

  onScroll():void{
    this.loadStarships();
  }
}
