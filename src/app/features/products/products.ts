import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { WishItem } from '../../models/wishlist';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartItem } from '../../models/cart';
import { Product } from "./product/product";
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { ToastService } from '../../shared/ui/toast/toast.service';
import { Promotions } from './promotions/promotions';

@Component({
  selector: 'app-products',
  imports: [Product, NgxSkeletonLoaderComponent, InfiniteScrollDirective, FormsModule, FilterPipe,Promotions],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {

  products: any[] = [];
  PageNumber: number = 1;
  isFavourite: boolean = false;
  WishItems!: WishItem[];
  fliterValue: string = "Default";
  Loading: boolean = false;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  limit = 10;
  offSet = 0;

  items: number[] = Array.from({ length: this.limit }, (_, i) => i + 1);

  cartService = inject(CartService);
  toastService = inject(ToastService);
  product = inject(ProductService);
  wishlistService = inject(WishlistService);
  cdr = inject(ChangeDetectorRef)

  getAllProducts(offset: number, limit: number) {
    this.Loading = true;
    this.product.getProduct(offset, limit).subscribe((data) => {
      setTimeout(() => {
        this.products = [...this.products, ...data]
        this.Loading = false;
        this.cdr.markForCheck();
      }, 1000);
    })
  }

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.toastService.show('Product added to cart successfully', 'success');
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
      this.toastService.show('Product added to wishlist successfully', 'success')
    }
  }

  productInWishList(itm: any) {
    const cartItemExist = this.WishItems.find((item) => item.product.id === itm.id);
    return cartItemExist;
  }

  getWishList() {
    this.wishlistService.wishList$.subscribe((cart) => {
      this.WishItems = cart?.items!;
    });
  }

  onScroll() {
    this.offSet += this.limit;
   // limiting the offset to 30 for the fake api call;
    if (this.offSet < 30) this.getAllProducts(Math.floor(this.offSet), Math.floor(this.limit));
  }

  ngOnInit(): void {
    this.getAllProducts(this.offSet, this.limit);
    this.getWishList();
  }

}


