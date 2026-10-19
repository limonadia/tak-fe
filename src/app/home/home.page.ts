import { Component } from '@angular/core';
import { IonHeader, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselComponent } from '../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ CarouselComponent, IonHeader, IonContent, NavbarComponent, TranslatePipe, IonSegment, IonSegmentButton, IonLabel, FormsModule],
})
export class HomePage {
  selectedSegment = 'participating';
  constructor(private router: Router) {}

  participatingCarousels = [
    { id: '1', items: [1, 2, 3, 4, 5], title: 'Events'},
    { id: '2', items: [1, 2, 3, 4, 5], title: 'Groups'},
    { id: '3', items: [1, 2, 3, 4, 5], title: 'Chats'},
    { id: '4', items: [1, 2, 3, 4, 5], title: 'Previously joined'}
  ]

  hostingCarousels = [
    { id: '1', items: [1, 2, 3, 4, 5], title: 'My Events'},
    { id: '2', items: [1, 2, 3, 4, 5], title: 'My Groups'},
    { id: '3', items: [1, 2, 3, 4, 5], title: 'Chats'},
    { id: '4', items: [1, 2, 3, 4, 5], title: 'Previous Events & Groups'}
  ]

  goTo(id: string){
    this.router.navigate([this.router.url + '/view-all/' + id]);
  }
}
