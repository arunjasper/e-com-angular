// src/app/toast/toast.component.ts
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// ... other imports

@Component({
  selector: 'ctl-toast',
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  encapsulation:ViewEncapsulation.ShadowDom,
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px) scale(0.9)'
      })),
      transition('void => *', [
        animate('0.3s ease-out', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }))
      ]),
      transition('* => void', [
        animate('0.2s ease-in', style({
          opacity: 0,
          transform: 'translateY(-20px) scale(0.9)'
        }))
      ])
    ])
  ]
})
export class Toast {
  @Input() message = '';
  @Input() type: ToastType = 'info';
  @Input() position : Position = 'top-left'
}
