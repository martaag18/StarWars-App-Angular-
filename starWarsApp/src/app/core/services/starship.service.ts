import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { StarshipApiResponse } from '../../shared/interfaces/starship-api-response.interface';
import { Starship } from '../../shared/interfaces/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private httpClient = inject(HttpClient);
  private apiUrl = "https://swapi.dev/api/starships/"

  getStarShips(currentPage: number): Observable<StarshipApiResponse> { 
    return this.httpClient.get<StarshipApiResponse>(`${this.apiUrl}?page=${currentPage}`).pipe(
      map(response => {
        response.results = response.results.map((starship: Starship) => { 
          const id = starship.url.split("/")[5]; // Extraer id de la URL
          return {...starship, id}; // Añadir 'id' al objeto
        });
        return response; 
      })
    );
  }

  getStarShipsById(id:string){
    return this.httpClient.get<Starship>(`https://swapi.dev/api/starships/${id}/`);

  }
}
