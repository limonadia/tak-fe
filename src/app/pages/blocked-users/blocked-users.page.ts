import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonBackButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.page.html',
  styleUrls: ['./blocked-users.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, CommonModule, FormsModule, TranslatePipe]
})
export class BlockedUsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
