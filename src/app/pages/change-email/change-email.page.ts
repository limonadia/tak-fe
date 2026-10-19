import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, CommonModule, FormsModule, TranslatePipe]
})
export class ChangeEmailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
