import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
  imports: [ IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslatePipe]
})
export class GroupDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get backHref(): string {
    return this.router.url.split('/group-details')[0];
  }

}
