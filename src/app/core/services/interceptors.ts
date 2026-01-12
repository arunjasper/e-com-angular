import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const localstorageToken = inject(LocalstorageService);
    const token = localstorageToken.getToken();
    const isAPIUrl = req.url.startsWith(environment.api);

    if (token && isAPIUrl) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
};