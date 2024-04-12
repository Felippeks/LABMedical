import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authChildGuardGuard } from './auth-child-guard.guard';

describe('authChildGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authChildGuardGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
