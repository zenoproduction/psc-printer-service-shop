import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { ShopStateService } from '../../services/shop-state.service';
import { Prodotto } from '../../models/shop.models';

@Component({
  selector: 'app-vetrina-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './vetrina-home.html',
  styleUrl: './vetrina-home.scss'
})
export class VetrinaHomeComponent implements OnInit {
  private shopService = inject(ShopService);
  private shopState = inject(ShopStateService);
  private route = inject(ActivatedRoute);

  slug = '';
  shopInfo = this.shopState.shopInfo;

  prodotti = signal<Prodotto[]>([]);
  loading = signal(true);
  errore = signal(false);
  categoriaSelezionata = signal<string>('');

  categorie = computed(() => {
    const cats = this.prodotti()
      .map(p => ({ nome: p.categoria_nome, slug: p.categoria_slug }))
      .filter((c): c is { nome: string; slug: string } => !!c.nome && !!c.slug);
    const seen = new Set<string>();
    return cats.filter(c => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    }).sort((a, b) => a.nome.localeCompare(b.nome));
  });

  prodottiFiltrati = computed(() => {
    const cat = this.categoriaSelezionata();
    return cat
      ? this.prodotti().filter(p => p.categoria_slug === cat)
      : this.prodotti();
  });

  ngOnInit(): void {
    this.slug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';
    this.caricaProdotti();
  }

  caricaProdotti(categoria?: string): void {
    this.loading.set(true);
    this.errore.set(false);
    this.shopService.getProdotti(this.slug, categoria).subscribe({
      next: (data) => {
        this.prodotti.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errore.set(true);
        this.loading.set(false);
      }
    });
  }

  selezionaCategoria(cat: string): void {
    this.categoriaSelezionata.set(cat);
  }

  trackById(_: number, p: Prodotto): number {
    return p.id;
  }

  prezzoFormattato(prezzo: number | null): string {
    if (prezzo === null) return 'Su richiesta';
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(prezzo);
  }

  immagineFallback(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-prodotto.svg';
  }
}
