import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `
    <div class="container py-5 text-center" style="max-width: 480px; margin: 0 auto;">
      <i class="bi bi-shop-window display-1 text-muted"></i>
      <h1 class="mt-3 h3">Vetrina non trovata</h1>
      <p class="text-muted">
        Lo shop che stai cercando non esiste o non è ancora attivo.<br>
        Controlla l'indirizzo e riprova.
      </p>
    </div>
  `
})
export class NotFoundComponent {}
