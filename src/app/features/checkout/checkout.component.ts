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
    // 1. Obtenemos el ID del usuario del servicio de Auth
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    this.isProcessing.set(true);

    // 2. Preparamos el Body exacto que pide tu NestJS
    const orderPayload = {
      userId: userId,
      items: this.cartStore.items().map((item) => ({
        productVariantId: item.productVariantId,
        fabricId: item.fabricId,
        quantity: item.quantity,
      })),
    };

    // 3. Enviamos la petición (El interceptor pondrá el Token automáticamente)
    this.http.post('http://localhost:3000/orders', orderPayload).subscribe({
      next: (res) => {
        this.cartStore.clear(); // Ahora ya no dará error
        this.router.navigate(['/success']); // Debes crear esta ruta/componente
      },
      error: (err) => {
        console.error('Order error:', err);
        alert('Transaction failed. Please check your connection or stock.');
        this.isProcessing.set(false);
      },
    });
  }
}
