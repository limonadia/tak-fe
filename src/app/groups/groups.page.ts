import { Component, ViewChild } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonContent, IonModal, IonSearchbar, IonTitle, IonToolbar } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../components/card/card.component';
import { Router } from '@angular/router'; 
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss'],
  imports: [ CardComponent, IonButton, IonButtons, IonHeader, IonContent, IonModal, IonSearchbar, IonTitle, IonToolbar, NavbarComponent, TranslatePipe]
})
export class GroupsPage {
  isModalOpen = false;
  cards = [
    { id: '1', cardTitle: 'Amsterdam', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '2', cardTitle: 'Buenos Aires', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '3', cardTitle: 'Cairo', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '4', cardTitle: 'Panama City', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
    { id: '5', cardTitle: 'New York', cardSubtitle: 'Card Subtitle', cardDescription: 'Here is a short description about this card.'},
  ];
  @ViewChild('sortGroupsModal') sortModal!: IonModal;
  @ViewChild('filterGroupsModal') filterModal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  public results = [...this.cards];

  constructor(private router: Router) {

  }
 goTo(id: string){
    this.router.navigate([this.router.url + '/group-details/' + id]);
  }
  cancel(modal: string) {
    if (modal === 'sortGroupsModal'){
      this.sortModal.dismiss(null, 'cancel');
    } else if (modal === 'filterGroupsModal'){
      this.filterModal.dismiss(null, 'cancel');
    }
  }

  confirm(modal:string) {
    if (modal === 'sortGroupsModal'){
      this.sortModal.dismiss(this.name, 'confirm');
    } else if (modal === 'filterGroupsModal'){
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
