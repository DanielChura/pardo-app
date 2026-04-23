import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  productVariantId: string;
  fabricId: string;
  name: string;
  woodName: string;
  fabricName: string;
  image: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  items = signal<CartItem[]>([]);

  count = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));
  total = computed(() => this.items().reduce((acc, item) => acc + item.price * item.quantity, 0));

  addItem(item: CartItem) {
    this.items.update((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, item];
    });
  }

  // ESTO ES LO QUE FALTABA
  clear() {
    this.items.set([]);
  }

  updateQuantity(id: string, qty: number) {
    if (qty <= 0) return;
    this.items.update((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }

  removeItem(id: string) {
    this.items.update((prev) => prev.filter((i) => i.id !== id));
  }
}
