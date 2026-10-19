import { Component, ViewChild } from '@angular/core';
import { IonButtons, IonHeader, IonInput, IonItem, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonModal  } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../components/card/card.component';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss'],
  imports: [ CardComponent, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonModal, NavbarComponent, TranslatePipe ]
})
export class EventsPage {
  isModalOpen = false;
  cards = [
    { id: '1', cardTitle: 'Amsterdam', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '2', cardTitle: 'Buenos Aires', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '3', cardTitle: 'Cairo', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '4', cardTitle: 'Panama City', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '5', cardTitle: 'New York', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
  ];
  @ViewChild('sortModal') sortModal!: IonModal;
  @ViewChild('filterModal') filterModal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  public results = [...this.cards];

  constructor(private router: Router) {}

  goTo(id: string){
    this.router.navigate([this.router.url + '/event-details/' + id]);
  }
  cancel(modal: string) {
    if (modal === 'sortModal'){
      this.sortModal.dismiss(null, 'cancel');
    } else if (modal === 'filterModal'){
      this.filterModal.dismiss(null, 'cancel');
    }
  }

  confirm(modal:string) {
    if (modal === 'sortModal'){
      this.sortModal.dismiss(this.name, 'confirm');
    } else if (modal === 'filterModal'){
      this.filterModal.dismiss(this.name, 'confirm');
    }
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.cards.filter((d) => d.cardTitle.toLowerCase().includes(query));
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
}
