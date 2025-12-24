import { Component, OnInit, inject, input } from '@angular/core';
import { WishItem } from '../../../models/wishlist';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartItem } from '../../../models/cart';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private toastService = inject(ToastService);

  readonly product = input<any>();
  WishItems!: WishItem[];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() { }

  ngOnInit(): void {
    this.getWishList();
  }

  addProductToWishList(item: any, event: any) {
    const WishItem: WishItem = {
      product: item
    };
    if (event.currentTarget.classList.contains("is-favourite")) {
      event.currentTarget.classList.remove("is-favourite")
      this.wishlistService.deleteWishItem(WishItem.product.id);
      this.toastService.show('Product removed from wishlist', 'error');
    }
    else {
      event.currentTarget.classList.add("is-favourite")
      this.wishlistService.setWishItem(WishItem);
      this.toastService.show('Product added to wishlist successfully', 'success');
    }
  }

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.toastService.show('Product added to cart successfully', 'success');
  }

  productInWishList(itm: any) {
    const cartItemExist = this.WishItems?.find((item) => item.product.id === itm.id);
    return cartItemExist;
  }
  getWishList() {
    this.wishlistService.wishList$.subscribe((cart) => {
      this.WishItems = cart?.items!;
    });
  }

}
