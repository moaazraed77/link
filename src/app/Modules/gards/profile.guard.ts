import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const profileGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem("loginObject") ? true : inject(Router).navigate(["/login"]);
};
