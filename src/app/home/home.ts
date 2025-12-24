import { Component, HostListener, inject, signal } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';
import { WishlistService } from '../core/services/wishlist.service';
import { Wishlist } from "./wishlist/wishlist";
import { Cart } from "./cart/cart";
import { ToastService } from '../shared/ui/toast/toast.service';
import { Toast } from '../shared/ui/toast/toast';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, Wishlist, Cart, Toast],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  isLoading?: boolean;
  router = inject(Router);
  cartService = inject(CartService);
  auth = inject(AuthService);
  wishlistService = inject(WishlistService);
  toastService = inject(ToastService);
  toastMessage = signal<any | null>(null);
  cartCount = 0;
  wishCount = 0;
  sticky: boolean = false;
  loggedIn: boolean = false;



  constructor() {
    this.toastMessage = this.toastService.toast$
    // Spinner for lazyload modules
    this.router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1500)
      }
    });
  }


  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 300) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
    this.wishlistService.wishList$.subscribe((wishList) => {
      this.wishCount = wishList?.items?.length ?? 0;
    });
    this.loggedIn = this.auth.loggedIn();
    console.log(this.loggedIn)
  }

  onActivate(event: any) {
    window.scroll(0, 0);
  }

}
