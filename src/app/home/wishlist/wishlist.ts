import { Component, inject, OnInit } from '@angular/core';
import { Confirm } from "../../shared/ui/confirm/confirm";
import { WishItem } from '../../models/wishlist';
import { CartItem } from '../../models/cart';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { Router } from "@angular/router";
import { ToastService } from '../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-wishlist',
  imports: [Confirm],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist implements OnInit {
  wishCount = 0;
  isOpenWishList: boolean = false;
  WishItems!: WishItem[];
  cartList!: CartItem[];
  isVisible: boolean = false;
  deleteProductId!: string;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  toastService = inject(ToastService);
  router = inject(Router);

  openWishList() {
    this.isOpenWishList = true;
    document.body.style.overflowY = "hidden";
  }


  closeSidebar() {
    this.isOpenWishList = false;
    document.body.style.overflowY = "auto";
  }

  getWishList() {
    this.wishlistService.wishList$.subscribe((cart) => {
      this.WishItems = cart?.items!;
    });
  }


  getCartList() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart?.items!;
    });
  }


  deleteWishItem() {
    this.wishlistService.deleteWishItem(this.deleteProductId);
    this.closeConfirmModal();

    this.toastService.show('Product removed from wishlist', 'error');
  }


  productInCartList(product: any) {
    const cartItemExist = this.cartList.find((item) => item.product.id === product.product.id);
    return cartItemExist;
  }

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.toastService.show('Product added to cart successfully!', 'success');
  }

  navigateToProductDetails(productId: string) {
    this.closeSidebar();
    this.router.navigate(['/products', productId]);
  }

  openConfirmModal(productId: string) {
    this.isVisible = true;
    this.deleteProductId = productId
  }

  closeConfirmModal() {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.wishlistService.wishList$.subscribe((wishList) => {
      this.wishCount = wishList?.items?.length ?? 0;
    });
    this.getCartList();
    this.getWishList();
  }

}



