import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { PilotsComponent } from './pilots.component';
import { StarshipService } from '../../../../core/services/starship.service';
import { of } from 'rxjs';
import { Pilot } from '../../../../shared/interfaces/pilot.interface';



//Crear mock para StarShipService
const starshipServiceMock = {
  getPilotDataById: jest.fn()
}

describe('PilotsScomponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: StarshipService, useValue: starshipServiceMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load pilot details correctly', () => {
    const mockPilot: Pilot = {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      birth_year: '19BBY',
      imageUrl: 'https://starwars-visualguide.com/assets/img/characters/1.jpg'
    };
    
    // Simulamos que el servicio retorna el piloto mockeado
    starshipServiceMock.getPilotDataById.mockReturnValue(of(mockPilot));
  
    // Configuramos los datos de los pilotos para el componente
    component.pilotUrls = ['https://swapi.dev/api/people/1/'];  
  
    // Llamamos al método loadPilots para cargar los detalles
    component.loadPilots();
    
    // Verificamos que el piloto se haya cargado correctamente
    expect(component.pilots.length).toBe(1); 
    expect(component.pilots[0].name).toBe('Luke Skywalker');
    expect(component.pilots[0].gender).toBe('male');
    expect(component.pilots[0].height).toBe('172');
    expect(component.pilots[0].birth_year).toBe('19BBY');
    expect(component.pilots[0].imageUrl).toBe('https://starwars-visualguide.com/assets/img/characters/1.jpg');
  });
  

  it('should extract ID correctly from URL', () => {
    const url = 'https://swapi.dev/api/people/1/';
    const id = component['extractIdFromUrl'](url);
  
    expect(id).toBe('1');
  });
   
})

