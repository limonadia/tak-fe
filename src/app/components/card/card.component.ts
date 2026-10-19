import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class CardComponent  implements OnInit {
  @Input() cardTitle?: string = '';
  @Input() cardSubtitle?: string = '';
  @Input() cardDescription?: string = '';

  constructor() { }

  ngOnInit() {}

}
