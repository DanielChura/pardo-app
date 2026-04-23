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

    <!-- Footer Minimalista Integrado -->
    <footer class="py-20 px-10 border-t border-black/5 text-center bg-[#f8f8f7]">
      <h2 class="serif text-5xl mb-10 tracking-tighter italic">Pardo.</h2>
      <div
        class="flex justify-center space-x-12 text-[10px] uppercase tracking-[0.3em] text-gray-400"
      >
        <a class="hover:text-black transition-colors cursor-pointer">Instagram</a>
        <a class="hover:text-black transition-colors cursor-pointer">Archive</a>
        <a class="hover:text-black transition-colors cursor-pointer">Contact</a>  
      </div>
    </footer>
  `,
})
export class CatalogComponent {
  private bedService = inject(BedService);
  // Convertimos el observable a Signal para un manejo de datos más moderno y eficiente
  beds = toSignal(this.bedService.getAllBeds());
}
