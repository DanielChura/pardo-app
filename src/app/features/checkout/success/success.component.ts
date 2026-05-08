import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 pb-12 px-6 flex items-center justify-center">
      <div class="max-w-md w-full text-center">
        <span class="text-[11px] font-medium uppercase tracking-[0.18em]" style="color: var(--pardo);">
          Transacción completada
        </span>

        <h1 class="text-[36px] md:text-[42px] font-normal text-[#111111] leading-[1.15] mt-4 mb-6" style="font-family: var(--font-serif);">
          Gracias por tu compra
        </h1>

        <p class="text-[16px] text-[#787774] leading-relaxed mb-8 max-w-sm mx-auto">
          Tu pedido está siendo procesado por nuestros artesanos. Te notificaremos cuando esté listo.
        </p>

        <a
          routerLink="/"
          class="inline-block py-3 px-8 text-[12px] font-medium uppercase tracking-[0.18em] bg-[#111111] text-white hover:bg-[var(--pardo)] transition-all duration-300"
          style="border-radius: 8px;"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  `,
})
export class SuccessComponent {}