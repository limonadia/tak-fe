import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.page.html',
  styleUrls: ['./view-all.page.scss'],
  imports: [ IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslatePipe]
})
export class ViewAllPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get backHref(): string {
    return this.router.url.split('/view-all')[0];
  }

}
