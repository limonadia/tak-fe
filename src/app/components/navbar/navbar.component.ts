import { Component, OnInit, Input } from '@angular/core';
import { IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notifications, alert, addOutline, ellipsisVertical } from 'ionicons/icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonToolbar, IonTitle, IonButton, IonIcon],
})
export class NavbarComponent  implements OnInit {
  @Input() title: string = '';

  constructor() {
    addIcons({ notifications, alert, addOutline, ellipsisVertical });
   }

  ngOnInit() {}

}
