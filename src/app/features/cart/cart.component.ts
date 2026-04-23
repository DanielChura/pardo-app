import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../core/state/cart.store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartStore = inject(CartStore);

  onQuantityChange(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const qty = parseInt(input.value);
    this.cartStore.updateQuantity(id, qty);
  }

  remove(id: string) {
    this.cartStore.removeItem(id);
  }
}
