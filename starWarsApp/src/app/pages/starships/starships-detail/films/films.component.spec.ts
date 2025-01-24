import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { FilmsComponent } from './films.component';
import { StarshipService } from '../../../../core/services/starship.service';
import { of } from 'rxjs';
import { Film } from '../../../../shared/interfaces/film.interface';


//Crear mock para StarShipService
const starshipServiceMock = {
  getFilmDataById: jest.fn()  // Asegúrate de que esta función esté mockeada
}

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: StarshipService, useValue: starshipServiceMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load film details correctly', () => {
    const mockFilm: Film = {

      title: "The Phantom Menace",
      director: "George Lucas",
      episode_id: "1",
      imageUrl: 'https://starwars-visualguide.com/assets/img/films/1.jpg'
    };
    
    // Simulamos que el servicio retorna el film mockeado
    starshipServiceMock.getFilmDataById.mockReturnValue(of(mockFilm))
  
    // Configuramos los datos de los pilotos para el componente
    component.filmsUrls = ['https://swapi.dev/api/film/1/'];  
  
    // Llamamos al método loadPilots para cargar los detalles
    component.loadFilms();
    
    // Verificamos que el piloto se haya cargado correctamente
    expect(component.films.length).toBe(1); 
    expect(component.films[0].title).toBe('The Phantom Menace');
    expect(component.films[0].director).toBe('George Lucas');
    expect(component.films[0].episode_id).toBe('1');
    expect(component.films[0].imageUrl).toBe('https://starwars-visualguide.com/assets/img/films/1.jpg');
  });
  

  it('should extract ID correctly from URL', () => {
    const url = 'https://swapi.dev/api/film/1/';
    const id = component.extractIdFromUrl(url)
  
    expect(id).toBe('1');
  });
   
})