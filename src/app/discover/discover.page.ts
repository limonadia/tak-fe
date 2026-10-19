import { Component } from '@angular/core';
import { IonHeader, IonContent } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
  imports: [IonHeader, IonContent, NavbarComponent, TranslatePipe, CarouselComponent],
})
export class DiscoverPage {

  constructor(private router: Router) {}

  carousels = [
    { id: '1', items: [1, 2, 3, 4, 5], title: 'Newest Events'},
    { id: '2', items: [1, 2, 3, 4, 5], title: 'Most Popular Events'},
    { id: '3', items: [1, 2, 3, 4, 5], title: 'Most Active Groups'}
  ]

  goTo(id: string){
    this.router.navigate([this.router.url + '/view-all/' + id]);
  }
}
