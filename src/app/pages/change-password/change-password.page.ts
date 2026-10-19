import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, TranslatePipe, CommonModule, FormsModule]
})
export class ChangePasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
