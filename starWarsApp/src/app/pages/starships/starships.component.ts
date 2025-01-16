import { Component } from '@angular/core';
import { StarshipService } from '../../core/services/starship.service';
import { inject } from '@angular/core';
import { Starship } from '../../shared/interfaces/starship.interface';

@Component({
  selector: 'app-starships',
  imports: [],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent {

  private starshipService = inject(StarshipService)

  starships: Starship[] = [];
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadStarships(this.currentPage); //1.Llamamos a la API para obtener las naves
  }

  loadStarships(currentPage: number): void { //2.Ejecutamos método para obtejer respuesta API
    this.starshipService.getStarShips(currentPage).subscribe({
      next: (data) => {
        this.starships = data.results; //Obtenemos respuesta
        console.log(data);
      },
      error: (err) => {
        console.log('Error getting starships from API', err);
      }
    })
  }
}

/* TEORIA

1. HttpClient (Angular) 
- Integración con Angular --> reactivo
- Utiliza Observables y subscribe()
- next / error
- Interceptores HTTP: posibilidad de usar interceptores para modificar solicitudes y respuestas a nivel global
- Creación de servicio que inyecta HttpClient y maneja solicitud a API. --> Servvicio devuelve Observables que pueden ser suscritos.

2. fetch() (JavaScript Nativo)
- Utiliza Promesas, no Observables.
- No necesidad crear servicio --> + simple.
- then() y catch() para manejar respuesta / error
- No reactivo --> cada llamada es una operación independiente. 
- Sin Interceptores

3. XMLHttpRequest (JavaScript Nativo)
- Forma tradicional
- Compatible  versiones antiguas de navegadores.
- Flexible --> configurar muchos aspectos solicitud
- Más complejo y largo de escribir
- No reactividad
- Manejo manual errores

4. Axios (Biblioteca Externa)
- Uso biblioteca externa para hacer solicitudes HTTP
- Similar a fetch() pero con + caract.
- Uso Promesas, sintaxis simple
- Interceptores para manejar respuestas y errores
- Soporte para solicitudes en paralelo
- Convierte respuesta a JSON de manera automática
- Necesidad instalar dependencia adicional

*/
