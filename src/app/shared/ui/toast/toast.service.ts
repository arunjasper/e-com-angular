// src/app/toast.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toast = signal<any | null>(null);
    public toast$ = this.toast;

    show(message: string, type: ToastType = 'info', position: Position = 'bottom-left', duration: number = 3000): void {
        this.toast.set({ message, type });

        setTimeout(() => {
            this.clear();
        }, duration);
    }

    clear(): void {
        this.toast.set(null);
    }
}