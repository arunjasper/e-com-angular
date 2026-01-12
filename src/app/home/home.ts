import { ChangeDetectorRef, Component, HostListener, inject, signal } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AuthService } from '../core/services/auth.service';
import { WishlistService } from '../core/services/wishlist.service';
import { Wishlist } from "./wishlist/wishlist";
import { Cart } from "./cart/cart";
import { ToastService } from '../shared/ui/toast/toast.service';
import { Toast } from '../shared/ui/toast/toast';
import { Confirm } from "../shared/ui/confirm/confirm";
import { LocalstorageService } from '../core/services/localstorage.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, Wishlist, Cart, Toast, Confirm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  isLoading?: boolean;
  router = inject(Router);
  cartService = inject(CartService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  wishlistService = inject(WishlistService);
  toastService = inject(ToastService);
  localStorageService = inject(LocalstorageService);
  toastMessage = signal<any | null>(null);
  cartCount = 0;
  wishCount = 0;
  sticky: boolean = false;
  loggedIn: boolean = false;
  isVisible: boolean = false;

  constructor() {
    this.toastMessage = this.toastService.toast$
    // Spinner for lazyload modules
    this.router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }, 1000)
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
    this.loggedIn = this.authService.loggedIn();
  }

  onActivate(event: any) {
    window.scroll(0, 0);
  }

  onSignOut() {
    this.isVisible = true;
  }

  signOut() {
    this.authService.isLoggedIn=false;
    this.localStorageService.removeToken();
    this.router.navigate([''])
  }

  closeConfirmModal() {
    this.isVisible = false;
  }

}
