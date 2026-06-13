import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { ShopStateService } from '../../services/shop-state.service';

@Component({
  selector: 'app-contatto',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contatto.html',
  styleUrl: './contatto.scss'
})
export class ContattoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shopService = inject(ShopService);
  private shopState = inject(ShopStateService);
  private fb = inject(FormBuilder);

  slug = '';
  shopInfo = this.shopState.shopInfo;

  invioInCorso = signal(false);
  invioSuccesso = signal(false);
  invioErrore = signal(false);

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    messaggio: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.slug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';
  }

  invia(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.invioInCorso.set(true);
    this.invioErrore.set(false);
    this.shopService.inviaContatto(this.slug, this.form.value).subscribe({
      next: () => {
        this.invioSuccesso.set(true);
        this.invioInCorso.set(false);
        this.form.reset();
      },
      error: () => {
        this.invioErrore.set(true);
        this.invioInCorso.set(false);
      }
    });
  }
}
