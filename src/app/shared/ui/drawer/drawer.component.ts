
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  
})
export class DrawerComponent {
  title = input<string>();
  open = false;

  className = 'sidenav'
  openNav() {
    // this.className ='expand'
    console.log('opened')
    this.open = true;
  }

  closeNav() {
    // this.className =''
    this.open = false;
  }

}

