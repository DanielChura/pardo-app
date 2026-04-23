import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedService } from '../../core/api/bed.service';
import { HeroComponent } from './components/hero/hero.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaterialGalleryComponent } from '../material-gallery/material-gallery.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, HeroComponent, ProductListComponent, MaterialGalleryComponent],
  template: `
    <app-hero />
    <app-product-list [beds]="beds() || []" />
    <app-material-gallery />
  `,
})
export class CatalogComponent {
  private bedService = inject(BedService);
  // Convertimos el observable a Signal para un manejo de datos más moderno y eficiente
  beds = toSignal(this.bedService.getAllBeds());
}
