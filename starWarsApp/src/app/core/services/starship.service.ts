import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { StarshipApiResponse } from '../../shared/interfaces/starship-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private httpClient = inject(HttpClient);
  private apiUrl = "https://swapi.dev/api/starships/"

  getStarShips(currentPage: number): Observable<StarshipApiResponse> { //método que devolverá un observable, un flujo de datos que podemos objservar.
    return this.httpClient.get<StarshipApiResponse>(`${this.apiUrl}?page=${currentPage}`); //Hacemos petición a API
  }
}
