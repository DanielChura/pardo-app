import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  scrollToCollection() {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  }
}