import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewEncapsulation, viewChild } from '@angular/core';

@Component({
  selector: 'ctl-carousel',
  imports: [NgTemplateOutlet],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Carousel implements OnInit {
  @Input() items: any[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() itemsVisible: number = 3; // Number of slides to show
  @Input() runSlides = false;
  private timeoutId: number | undefined;
  readonly carouselContainer = viewChild.required<ElementRef>('carouselContainer');

  currentIndex = 0;
  slideWidth = '0px';

  ngOnInit() {
    // Calculate the width for each slide based on how many are visible
    this.slideWidth = `calc(100% / ${this.itemsVisible})`;
    if (this.runSlides) {
      this.timeoutId = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    // Clean up the timeout when the component is destroyed
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  nextSlide() {
    if (this.currentIndex < this.items.length - this.itemsVisible) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the start
    }
    this.updateCarouselPosition();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - this.itemsVisible; // Loop to the end
    }
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    const offset = this.currentIndex * (100 / this.itemsVisible);
    this.carouselContainer().nativeElement.style.transform = `translateX(-${offset}%)`;
  }

}
