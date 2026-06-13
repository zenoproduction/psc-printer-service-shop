import { Routes } from '@angular/router';
import { shopResolver } from './resolvers/shop.resolver';
import { ShopLayoutComponent } from './shop/shop-layout/shop-layout';
import { VetrinaHomeComponent } from './shop/vetrina-home/vetrina-home';
import { ProdottoDetailComponent } from './shop/prodotto-detail/prodotto-detail';
import { ContattoComponent } from './shop/contatto/contatto';
import { NotFoundComponent } from './shop/not-found/not-found';

export const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: ':slug',
    component: ShopLayoutComponent,
    resolve: { shopInfo: shopResolver },
    children: [
      { path: '', component: VetrinaHomeComponent },
      { path: 'prodotti/:prodottoSlug', component: ProdottoDetailComponent },
      { path: 'contatto', component: ContattoComponent }
    ]
  },
  { path: '', redirectTo: '/not-found', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];
