import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Checkout } from './features/checkout/checkout';
import { Products } from './features/products/products';
import { ProductDetails } from './features/products/product-details/product-details';
import { Login } from './features/auth/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: Products },
            { path: 'products/:id', component: ProductDetails },
            { path: 'checkout', component: Checkout },
            { path: 'user', component: Login},
            { path: 'register', component: Register}
        ]
    }
];
