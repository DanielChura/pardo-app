import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../core/state/cart.store';
import { AuthService } from '../../core/api/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  cartStore = inject(CartStore);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  isProcessing = signal(false);

  confirmOrder() {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Sesión expirada. Por favor inicia sesión.');
      this.router.navigate(['/login']);
      return;
    }

    this.isProcessing.set(true);

    const orderPayload = {
      items: this.cartStore.items().map((item) => ({
        productVariantId: item.productVariantId,
        fabricId: item.fabricId,
        quantity: item.quantity,
      })),
    };

    this.http.post('http://localhost:3000/orders', orderPayload).subscribe({
      next: () => {
        this.cartStore.clear();
        this.router.navigate(['/success']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Transacción fallida. Verifica tu conexión o stock.');
        this.isProcessing.set(false);
      },
    });
  }
}