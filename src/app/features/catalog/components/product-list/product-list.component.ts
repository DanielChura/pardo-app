import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Bed } from '../../../../core/models/ecommerce.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input({ required: true }) beds: Bed[] = [];

  calculateMinPrice(bed: Bed): number {
    if (!bed.variants?.length) return 750;
    const minVariant = Math.max(...bed.variants.map((v) => v.price));
    return minVariant + 250;
  }

  hasStock(bed: Bed): boolean {
    return bed.variants.some((v) => v.stock > 0);
  }

  getTotalStock(bed: Bed): number {
    return bed.variants.reduce((total, v) => total + v.stock, 0);
  }
}