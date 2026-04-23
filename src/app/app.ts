import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    @if (!hideLayout()) {
      <app-header />
    }
    <router-outlet />
    @if (!hideLayout()) {
      <app-footer />
    }
  `,
})
export class App {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  // Signal que detecta si la ruta actual tiene 'hideLayout: true'
  hideLayout = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route?.snapshot.data['hideLayout'] === true;
      }),
    ),
    { initialValue: false },
  );
}
