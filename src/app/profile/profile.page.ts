import { Component } from '@angular/core';
import { IonHeader, IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonList, IonIcon } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { arrowForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonHeader, IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonList, IonIcon, NavbarComponent, TranslatePipe, CommonModule],
})
export class ProfilePage {
  public listItems = [
    { title: 'profile.connections', goTo: 'connections' },
    { title: 'profile.language', goTo: 'language' },
    { title: 'profile.theme', goTo: 'theme' },
    { title: 'profile.analytics', goTo: 'analytics' },
    { title: 'profile.blocked-users', goTo: 'blocked-users' },
    { title: 'profile.change-email', goTo: 'change-email' },
    { title: 'profile.change-password', goTo: 'change-password' },
    { title: 'profile.logout', goTo: 'logout' },
    { title: 'profile.delete-account', goTo: 'delete-account' }
  ]
  constructor(
    private router: Router
  ) {
    addIcons({ arrowForwardOutline });
  }

  navigateTo(url: string) {
    if(url === 'logout' || url === 'delete-account') {
      console.log("Open modal for confirmation: " + url);
    } else {
      this.router.navigate([this.router.url.toString() + '/' + url]);
    }
  }

}
