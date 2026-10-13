import { Component } from '@angular/core';
import { IonHeader, IonListHeader, IonRadioGroup, IonRadio, IonContent, IonButton, IonLabel, IonItem } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService, ThemeMode } from '../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonHeader, IonListHeader, IonRadioGroup, IonRadio, IonContent, IonButton, IonLabel, IonItem, NavbarComponent, TranslatePipe],
})
export class ProfilePage {
  constructor(private translateService: TranslateService,
    public themeService: ThemeService
  ) {}

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  changeTheme(mode: ThemeMode): void {
    this.themeService.setTheme(mode);
  }
}
