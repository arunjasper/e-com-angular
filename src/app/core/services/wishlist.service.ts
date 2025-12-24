import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WishList } from '../../models/wishlist';
import { Cart, CartItem } from '../../models/cart';
export const WISHLIST_KEY = 'wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishList$: BehaviorSubject<WishList> = new BehaviorSubject(this.getWishlist());

  initWishlistLocalStorage() {
    const Wishlist: WishList = this.getWishlist();
    if (!Wishlist) {
      const wishListCart = {
        items: []
      };
      const wishListCartJson = JSON.stringify(wishListCart);
      localStorage.setItem(WISHLIST_KEY, wishListCartJson);
    }
  }

  emptyCart() {
    const wishListCart = {
      items: []
    };
    const wishListCartJson = JSON.stringify(wishListCart);
    localStorage.setItem(WISHLIST_KEY, wishListCartJson);
    this.wishList$.next(wishListCart);
  }

  getWishlist(): WishList {
    const wishlistJsonString = localStorage.getItem(WISHLIST_KEY);
    const cart: Cart = JSON.parse(wishlistJsonString!);
    return cart;
  }

  setWishItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const WishList = this.getWishlist();
    const cartItemExist = WishList.items?.find((item) => item.product.id === cartItem.product.id);
    if (cartItemExist) {
      WishList.items?.map((item) => {
        if (item.product.id === cartItem.product.id) {
        }
      });
    } else {
      WishList.items?.push(cartItem);
    }
    const cartJson = JSON.stringify(WishList);
    localStorage.setItem(WISHLIST_KEY, cartJson);
    this.wishList$.next(WishList);
    return WishList;
  }

  deleteWishItem(productId: string) {
    const WishList = this.getWishlist();
    const newWishList = WishList.items?.filter((item) => item.product.id !== productId);
    WishList.items = newWishList;
    const wishListJsonString = JSON.stringify(WishList);
    localStorage.setItem(WISHLIST_KEY, wishListJsonString);
    this.wishList$.next(WishList);
  }
}
