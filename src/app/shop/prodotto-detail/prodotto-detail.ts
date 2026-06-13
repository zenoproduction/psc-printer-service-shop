import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { ShopStateService } from '../../services/shop-state.service';
import { Prodotto } from '../../models/shop.models';

@Component({
  selector: 'app-prodotto-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './prodotto-detail.html',
  styleUrl: './prodotto-detail.scss'
})
export class ProdottoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shopService = inject(ShopService);
  private shopState = inject(ShopStateService);
  private fb = inject(FormBuilder);

  slug = '';
  prodottoSlug = '';
  shopInfo = this.shopState.shopInfo;

  prodotto = signal<Prodotto | null>(null);
  loading = signal(true);
  errore = signal(false);

  formAperto = signal(false);
  invioInCorso = signal(false);
  invioSuccesso = signal(false);
  invioErrore = signal(false);

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    cognome: [''],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    azienda: [''],
    note: ['']
  });

  ngOnInit(): void {
    this.slug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';
    this.prodottoSlug = this.route.snapshot.paramMap.get('prodottoSlug') ?? '';
    this.caricaProdotto();
  }

  caricaProdotto(): void {
    this.loading.set(true);
    this.errore.set(false);
    this.shopService.getProdotto(this.slug, this.prodottoSlug).subscribe({
      next: (data) => {
        this.prodotto.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errore.set(true);
        this.loading.set(false);
      }
    });
  }

  prezzoFormattato(prezzo: number | null): string {
    if (prezzo === null) return 'Su richiesta';
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(prezzo);
  }

  apriForm(): void {
    this.formAperto.set(true);
    this.invioSuccesso.set(false);
    this.invioErrore.set(false);
  }

  inviaRichiesta(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.invioInCorso.set(true);
    this.invioErrore.set(false);
    const p = this.prodotto();
    const payload = {
      ...this.form.value,
      prodotto_id: p?.id,
      prodotto_nome: p?.nome
    };
    this.shopService.inviaPreventivo(this.slug, payload).subscribe({
      next: () => {
        this.invioSuccesso.set(true);
        this.invioInCorso.set(false);
        this.formAperto.set(false);
        this.form.reset();
      },
      error: () => {
        this.invioErrore.set(true);
        this.invioInCorso.set(false);
      }
    });
  }

  immagineFallback(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-prodotto.svg';
  }
}
