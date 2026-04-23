import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartStore } from '../../core/state/cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Inyectamos el Store de Signals que creamos antes
  cartStore = inject(CartStore);
  
  // Estado para el scroll
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el scroll baja más de 50px, cambiamos el estilo del header
    this.isScrolled.set(window.scrollY > 50);
  }
}