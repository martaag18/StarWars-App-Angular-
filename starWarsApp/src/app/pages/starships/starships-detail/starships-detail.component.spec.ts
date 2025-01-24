import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { StarshipsDetailComponent } from './starships-detail.component';
import { StarshipService } from '../../../core/services/starship.service';
import { of, throwError } from 'rxjs'; //crea observable
import { ActivatedRoute} from '@angular/router';


describe('StarshipsDetailComponent', () => {
  let component: StarshipsDetailComponent;
  let fixture: ComponentFixture<StarshipsDetailComponent>; //fixture - instancia para interactuar con el componente en el entorno de prueba
  let starshipServiceMock: any;
  let activatedRouteMocK: any;

  beforeEach( async () => {
    //Crear mocks
    starshipServiceMock = {
      getStarShipsById: jest.fn() //Simulamos método getStarShipsById --> jest.fn() --> crear función simulada
    };

    activatedRouteMocK = {
      snapshot: { paramMap: { get:jest.fn() } }
    }

    await TestBed.configureTestingModule({
      imports: [StarshipsDetailComponent],
        providers: [
          { provide: StarshipService, useValue: starshipServiceMock },
          { provide: ActivatedRoute, useValue: activatedRouteMocK},
  
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(StarshipsDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();  

  
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should call getStarShipsById on ngOnInit', () => {
      const id = '123';
      activatedRouteMocK.snapshot.paramMap.get.mockReturnValue(id);
    
      // Simular que el servicio retorna un observable
      starshipServiceMock.getStarShipsById.mockReturnValue(of({ name: 'Millennium Falcon' }));
    
      // Llamar a ngOnInit
      component.ngOnInit();
    
      // Verificar que se haya llamado a getStarShipsById con el id correcto
      expect(starshipServiceMock.getStarShipsById).toHaveBeenCalledWith(id);
    });

    it('should load starship details correctly', () => {
      const mockStarship = { name: 'MILLENNIUM FALCON', imageUrl: ''};
      const id = '123';
      activatedRouteMocK.snapshot.paramMap.get.mockReturnValue(id);
    
      // Simular servicio que retorna un observable con los datos de la nave
      starshipServiceMock.getStarShipsById.mockReturnValue(of(mockStarship));
    
      component.ngOnInit();
    
      // Comprobar que los datos se asignen correctamente
      expect(component.starship).toEqual(mockStarship);
      expect(component.starship?.name).toBe('MILLENNIUM FALCON'); 
    });

    it('should set default image if starship image is not available', () => {
      const mockStarship = { name: 'Millennium Falcon', imageUrl: ""}; 
      const id = '123';
      activatedRouteMocK.snapshot.paramMap.get.mockReturnValue(id);

    
      starshipServiceMock.getStarShipsById.mockReturnValue(of(mockStarship));

      component.ngOnInit();

      //Lamar método setDefaultImage para establecer imagen por defecto
      component.setDefaultImage();

      //Comprobar que imagen ha sido cambiada por imagen por defecto
      expect(component.isDefaultImage).toBe(true);
      expect(component.starship?.imageUrl).toBe('assets/images/default-starship.jpg');  

    });

    it('should handle error when loading starship details fails', () => {
      const id = '123';
      activatedRouteMocK.snapshot.paramMap.get.mockReturnValue(id);
    
      // Simular que el servicio lanza un error
      starshipServiceMock.getStarShipsById.mockReturnValue(throwError(() => new Error('Not found'))); // Usar throwError para simular un error
    
      // Mockear console.error
      console.error = jest.fn();
    
      // Llamar ngOnInit
      component.ngOnInit();
    
      // Verificar que console.error haya sido llamado con el mensaje adecuado
      expect(console.error).toHaveBeenCalledWith('Not able to show details', new Error('Not found'));
    });

  })

 


