import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { OrderService } from '../../core/api/order.service';
import { Order } from '../../core/models/order.model';
import { UserProfile } from '../../core/models/user.model';
import { UsersService } from '../../core/api/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly usersService = inject(UsersService);

  allOrders = signal<Order[]>([]);
  profile = signal<UserProfile | null>(null);

  ngOnInit(): void {
    this.orderService.getOrder().subscribe((orders) => {
      this.allOrders.set(orders);
    });

    this.usersService.getProfile().subscribe((profile) => {
      this.profile.set(profile);
    });
  }
}
