import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShopInfo, Prodotto, Categoria } from '../models/shop.models';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getShopInfo(slug: string): Observable<ShopInfo> {
    return this.http.get<ShopInfo>(`${this.base}/api/shop/${slug}`);
  }

  getCategorie(slug: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.base}/api/shop/${slug}/categorie`);
  }

  getProdotti(slug: string, categoria?: string): Observable<Prodotto[]> {
    const params = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
    return this.http.get<Prodotto[]>(`${this.base}/api/shop/${slug}/prodotti${params}`);
  }

  getProdotto(slug: string, prodottoSlug: string): Observable<Prodotto> {
    return this.http.get<Prodotto>(`${this.base}/api/shop/${slug}/prodotti/${prodottoSlug}`);
  }

  inviaPreventivo(slug: string, data: any): Observable<any> {
    return this.http.post(`${this.base}/api/shop/${slug}/preventivo`, data);
  }

  inviaContatto(slug: string, data: any): Observable<any> {
    return this.http.post(`${this.base}/api/shop/${slug}/contatto`, data);
  }
}
