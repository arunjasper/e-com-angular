import { Component, inject, OnInit } from '@angular/core';
import { Confirm } from "../../shared/ui/confirm/confirm";
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../models/cart';
import { ToastService } from '../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-cart',
  imports: [Confirm],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  cartCount = 0;
  totalPrice!: number;
  isOpenCartlist: boolean = false;
  isVisible: boolean = false;
  cartList!: CartItem[];
  deleteProductId!: string;

  router = inject(Router);
  cartService = inject(CartService);
  toastService = inject(ToastService);

  openCartlist() {
    this.getCartList();
    this.isOpenCartlist = true;
    document.body.style.overflowY = "hidden";
  }

  closeSidebar() {
    this.isOpenCartlist = false;
    document.body.style.overflowY = "auto";
  }

  getCartList() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart?.items!;
    });
  }

  deleteCartItem() {
    this.cartService.deleteCartItem(this.deleteProductId);
    this.closeCofirmModal();
    this.toastService.show('Product removed from cart');
  }

  getTotalPrice() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item: CartItem) => {
          this.totalPrice += item.product.price! * item.quantity!;
        });
      }
    });
  }

  updateCartItemQuantity(value: number, cartItem: CartItem, operation: string) {
    if (operation == "+") {
      value++;
    } else {
      value--;
    }
    this.cartService.setCartItem(
      {
        product: cartItem.product,
        quantity: value,
      },
      true
    );
  }

  navigateToCheckout() {
    this.closeSidebar();
    this.router.navigate(['/checkout']);
  }

  navigateToProductDetails(productId: string) {
    this.closeSidebar();
    this.router.navigate(['/products', productId]);
  }

  openCofirmModal(productId: string) {
    this.isVisible = true;
    this.deleteProductId = productId
  }

  closeCofirmModal() {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
    this.getCartList();
    this.getTotalPrice();
  }
}



