import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="h-screen bg-black text-white flex items-center justify-center p-6">
      <div class="text-center animate-in fade-in zoom-in duration-1000">
        <h2 class="serif text-[15vw] md:text-[10vw] leading-none italic mb-8">Thank you.</h2>
        <p class="uppercase tracking-[0.5em] text-[10px] text-gray-500 mb-12">
          Your architectural pieces are being prepared.
        </p>
        <a
          routerLink="/catalog"
          class="border border-white/20 px-10 py-4 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Return to Gallery
        </a>
      </div>
    </section>
  `,
})
export class SuccessComponent {}
