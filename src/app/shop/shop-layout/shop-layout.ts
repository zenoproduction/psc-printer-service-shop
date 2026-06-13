import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopStateService } from '../../services/shop-state.service';

@Component({
  selector: 'app-shop-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './shop-layout.html',
  styleUrl: './shop-layout.scss'
})
export class ShopLayoutComponent {
  private shopState = inject(ShopStateService);
  private route = inject(ActivatedRoute);

  shopInfo = this.shopState.shopInfo;
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
}
