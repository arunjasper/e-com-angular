import { Injectable, Signal, inject } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProdService {

    getProduct(offset: Signal<number>, limit: Signal<number>): HttpResourceRef<any> {
        return httpResource(() => `${environment.api}v1/products?offset=${offset}&limit=${limit}`);
    }

    getSingleProduct(id: Signal<number>): HttpResourceRef<any> {
        return httpResource(() => `${environment.api}v1/products/${id}`);
    }

    getProductsByCategory(id: number): HttpResourceRef<any> {
        return httpResource(() => `${environment.api}v1/categories/${id}/products?offset=0&limit=10`);
    }

}



