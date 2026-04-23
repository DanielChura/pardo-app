import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bed } from '../../../../core/models/ecommerce.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input({ required: true }) beds: Bed[] = [];
  private router = inject(Router);

  /**
   * Lógica de precio: Variate mínima + Tela base ($250)
   */
  calculateMinPrice(bed: Bed): number {
    if (!bed.variants?.length) return 750;
    const minVariant = Math.max(...bed.variants.map((v) => v.price));
    return minVariant + 250;
  }

  goToDetail(id: string) {
    this.router.navigate(['/product-detail', id]);
  }
}
