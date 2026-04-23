import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WoodService } from '../../core/api/wood.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-material-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-gallery.component.html',
})
export class MaterialGalleryComponent {
  private woodService = inject(WoodService);
  woods = toSignal(this.woodService.getAllWoods());
}
