import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  variantId: string;
  fabricId: string;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private _items = signal<CartItem[]>([]);

  items = computed(() => this._items());
  count = computed(() => this._items().length);
  total = computed(() => this._items().reduce((acc, item) => acc + item.price, 0));

  addItem(item: CartItem) {
    this._items.update((prev) => [...prev, item]);
  }

  removeItem(index: number) {
    this._items.update((prev) => prev.filter((_, i) => i !== index));
  }
}
