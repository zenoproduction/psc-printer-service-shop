import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="container py-5 text-center">
      <i class="bi bi-exclamation-circle display-1 text-muted"></i>
      <h1 class="mt-3">Vetrina non trovata</h1>
      <p class="text-muted">Lo shop che cerchi non esiste o non è ancora attivo.</p>
    </div>
  `
})
export class NotFoundComponent {}
