import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  scroll() {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  }
}
