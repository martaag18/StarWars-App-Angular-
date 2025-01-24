import { ComponentFixture, TestBed } from '@angular/core/testing'; //ComponentFixture - interactuar con el componente y verificar comportamiento
import { StarshipsComponent } from './starships.component';
import { StarshipService } from '../../core/services/starship.service';
import { of } from 'rxjs'; //crea observable
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


class StarshipServiceMock { //creamos clase que simula comportamiento servicio StarShipService original. --> Mocking
  getStarships() {
    return of({ results: [] });
  }
}

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>; //fixture - instancia para interactuar con el componente en el entorno de prueba
  let starshipServiceMock: StarshipServiceMock;

  beforeEach(async () => { //executed before every single test
    await TestBed.configureTestingModule({
      imports: [RouterLink, MatProgressBarModule, InfiniteScrollDirective, StarshipsComponent],
      providers: [{ provide: StarshipService, useClass: StarshipServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    starshipServiceMock = TestBed.inject(StarshipService) as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadStarships on ngOnInit', () => {
    jest.spyOn(component, 'loadStarships');
    component.ngOnInit();
    expect(component.loadStarships).toHaveBeenCalled();
  });

  it('should call the getStarships method of StarshipService', () => {
    const spy = jest.spyOn(starshipServiceMock, 'getStarships');
    component.loadStarships();
    expect(spy).toHaveBeenCalled();
  });

  it('should set hasMoreData to false if no starships are returned', () => {
    const spy = jest.spyOn(starshipServiceMock, 'getStarships').mockReturnValueOnce(of({ results: [] }));
    component.loadStarships();
    expect(component.hasMoreData).toBe(false);
  });

  it('should call loadStarships when scrolling', () => {
    jest.spyOn(component, 'loadStarships');
    component.onScroll();
    expect(component.loadStarships).toHaveBeenCalled();
  });
});
