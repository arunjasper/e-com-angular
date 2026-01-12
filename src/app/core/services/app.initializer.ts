import { inject } from "@angular/core";
import { WishlistService } from "./wishlist.service";
import { CartService } from "./cart.service";
import { LocalstorageService } from "./localstorage.service";
import { AuthService } from "./auth.service";

export function initializeApp() {
    const wishlistService = inject(WishlistService);
    const cartService = inject(CartService);
    const localstorageService = inject(LocalstorageService);
    const authService = inject(AuthService);
    wishlistService.initWishlistLocalStorage();
    cartService.initCartLocalStorage();
    if (localstorageService.getToken()) {
        authService.startRefreshTokenTimer();
    }
    console.log('App initialization complete (synchronous).');
}
