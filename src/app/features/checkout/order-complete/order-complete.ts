import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.html',
  styleUrls: ['./order-complete.scss'],
  imports: [DatePipe]
})
export class OrderComplete implements OnInit {
  totalPrice!: number;
  today: number = Date.now();

  constructor(
    private router: Router,
    private _cartService: CartService,
  ) { }

  navigateToStore() {
    this.router.navigate(['/'])
  }

  getTotalPrice() {
    this._cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.totalPrice += item.product.price! * item.quantity!;
        });
      }
    });
  }

  ngOnInit(): void {
    this.getTotalPrice();
  }
}
