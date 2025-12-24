import { Injectable, inject } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { CartService } from './cart.service';
import { LocalstorageService } from './localstorage.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private config: any;
    private wishlistService = inject(WishlistService);
    private cartService = inject(CartService);
    private localstorageService = inject(LocalstorageService);
    private authService = inject(AuthService);
    async loadConfig() {
        this.wishlistService.initWishlistLocalStorage();
        this.cartService.initCartLocalStorage();
        if (this.localstorageService.getToken()) {
            this.authService.startRefreshTokenTimer();
        }
    }

    getConfig() {
        return this.config;
    }
}

// Factory function that returns the initializer function
export function initializeAppFactory(appConfig: AppConfigService) {
    return () => appConfig.loadConfig();
}
