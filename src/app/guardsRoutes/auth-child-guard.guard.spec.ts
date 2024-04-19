import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authChildGuard } from './auth-child-guard.guard';

describe('authChildGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
