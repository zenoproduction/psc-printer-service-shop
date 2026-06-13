import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ShopService } from '../services/shop.service';
import { ShopStateService } from '../services/shop-state.service';
import { ShopInfo } from '../models/shop.models';

export const shopResolver: ResolveFn<ShopInfo> = (route) => {
  const shopService = inject(ShopService);
  const shopState = inject(ShopStateService);
  const router = inject(Router);
  const slug = route.paramMap.get('slug') ?? '';

  return shopService.getShopInfo(slug).pipe(
    tap(info => shopState.setShopInfo(info)),
    catchError(() => {
      router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};
