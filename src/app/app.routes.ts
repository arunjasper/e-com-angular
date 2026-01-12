import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.Home),
        children: [
            { path: '', loadComponent: () => import('./features/products/products').then(m => m.Products) },
            { path: 'products/:id', loadComponent: () => import('./features/products/product-details/product-details').then(m => m.ProductDetails) },
            { path: 'checkout', loadComponent: () => import('./features/checkout/checkout').then(m => m.Checkout), canActivate: [AuthGuard] },
            { path: 'checkout/success', loadComponent: () => import('./features/checkout/order-complete/order-complete').then(m => m.OrderComplete), canActivate: [AuthGuard] },
            { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.Login) },
            { path: 'account', loadComponent: () => import('./features/auth/account/account').then(m => m.Account), canActivate: [AuthGuard] },
            { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) }
        ]
    }
];
