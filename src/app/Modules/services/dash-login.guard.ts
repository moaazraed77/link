import { CanActivateFn } from '@angular/router';

export const dashLoginGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem("dash") == "is Admin")
    return true;
  else
    return false;
};
