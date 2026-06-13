import { Injectable, signal, computed } from '@angular/core';
import { ShopInfo } from '../models/shop.models';

@Injectable({ providedIn: 'root' })
export class ShopStateService {
  private _shopInfo = signal<ShopInfo | null>(null);

  readonly shopInfo = computed(() => this._shopInfo());

  setShopInfo(info: ShopInfo): void {
    this._shopInfo.set(info);
    document.documentElement.style.setProperty(
      '--shop-primary',
      info.shop_colore_primario || '#0066cc'
    );
  }

  clear(): void {
    this._shopInfo.set(null);
  }
}
