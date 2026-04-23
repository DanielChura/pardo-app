import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/api/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');
  isSuccess = signal(false);

  onRegister() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        // Esperamos 2 segundos para que vea el mensaje de éxito antes de redirigir
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage.set('Could not create account. Maybe the email is already in use.');
        this.isLoading.set(false);
      },
    });
  }
}
