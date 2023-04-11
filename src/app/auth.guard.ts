import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { HomeService } from './home/home.service';

export const authGuard = () => {
  const homeService = inject(HomeService);
  const router = inject(Router);

  if (homeService.user$) {
    homeService.getCurrentUser();
  }

  return homeService.user$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  );
};
