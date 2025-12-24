import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";

import { ToastService } from './shared/ui/toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  toastMessage = signal<any | null>(null);
  constructor(private toastService: ToastService) {
    this.toastMessage = this.toastService.toast$
  }
}
