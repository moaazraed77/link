import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dashLoginGuard } from './dash-login.guard';

describe('dashLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dashLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
