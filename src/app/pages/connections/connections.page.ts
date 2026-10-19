import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.page.html',
  styleUrls: ['./connections.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, CommonModule, FormsModule, TranslatePipe]
})
export class ConnectionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
