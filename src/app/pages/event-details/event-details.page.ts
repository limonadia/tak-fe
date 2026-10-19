import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
  imports: [IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslatePipe]
})
export class EventDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get backHref(): string {
    return this.router.url.split('/event-details')[0];
  }

}
