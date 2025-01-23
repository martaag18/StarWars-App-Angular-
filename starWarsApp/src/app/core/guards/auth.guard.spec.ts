import { TestBed } from '@angular/core/testing';
import { AuthGuardGuard } from './auth.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardGuard], // Registramos el guard
    });

    guard = TestBed.inject(AuthGuardGuard); // Obtenemos la instancia del guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Verificamos que el guard se haya creado correctamente
  });
});
