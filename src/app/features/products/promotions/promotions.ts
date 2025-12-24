import { Component } from '@angular/core';
import { Carousel } from '../../../shared/ui/carousel/carousel';

@Component({
  selector: 'app-promotions',
  imports: [Carousel],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions {
  promotions: any[] = [
    { message: 'I phone 13 now $199', url: 'phone.png' },
    { message: "100s of savings-don't miss out!", url: 'ad2.png' },
    { message: 'Find your forever bag', url: 'ad3.png' },
    { message: 'Shop iconic pre-loved pieces', url: 'ad1.png' },
    { message: 'Last-minute gifts by price', url: 'ad2.png' }
  ];
}
