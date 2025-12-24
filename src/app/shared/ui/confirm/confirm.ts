
import { Component, EventEmitter, OnInit, Output, input, model } from '@angular/core';

@Component({
  selector: 'app-confirm',
  imports: [],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
})
export class Confirm implements OnInit {

  isVisible = model.required<boolean>();
  readonly message = input.required<string>();
  readonly title = input.required<string>();
  readonly confirmBtnText = input<string>('Confirm');
  readonly cancelBtnText = input<string>('Cancel');

  @Output() confirm = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.confirm.emit(true);
    this.isVisible.set(false);
  }

  close() {
    this.isVisible.set(false);
    this.cancel.emit(false);
  }

}


