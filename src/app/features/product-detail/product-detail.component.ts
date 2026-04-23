import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BedService } from '../../core/api/bed.service';
import { FabricService } from '../../core/api/fabric.service';
import { CartStore } from '../../core/state/cart.store';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bedService = inject(BedService);
  private fabricService = inject(FabricService);
  private cartStore = inject(CartStore);

  // Estados de carga
  bed = signal<any>(null);
  fabrics = signal<any[]>([]);

  // Selecciones del usuario
  selectedVariant = signal<any>(null); // Madera
  selectedFabric = signal<any>(null); // Tela

  // Precio dinámico reactivo
  totalPrice = computed(() => {
    const v = this.selectedVariant();
    const f = this.selectedFabric();
    return (v?.price || 0) + (f?.price || 0);
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bedService.getBedById(id).subscribe((data) => {
        this.bed.set(data);
        if (data.variants?.length > 0) this.selectedVariant.set(data.variants[0]);
      });

      this.fabricService.getAllFabrics().subscribe((data) => {
        this.fabrics.set(data);
        if (data.length > 0) this.selectedFabric.set(data[0]);
      });
    }
  }

  addToCart() {
    const item = {
      id: this.selectedVariant().id + this.selectedFabric().id,
      productVariantId: this.selectedVariant().id,
      fabricId: this.selectedFabric().id,
      name: `${this.bed().name} - ${this.selectedVariant().wood.name}`,
      price: this.totalPrice(),
      woodName: this.selectedVariant().wood.name,
      fabricName: this.selectedFabric().name,
      image: this.bed().imageUrl,
      quantity: 1,
    };
    this.cartStore.addItem(item);
    alert('Added to your collection');
  }
}
