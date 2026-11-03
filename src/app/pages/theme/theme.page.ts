import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadioGroup, IonRadio, IonItem } from '@ionic/angular';
import { ThemeMode, ThemeService } from '../../services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadioGroup, IonRadio, IonItem, CommonModule, FormsModule, TranslatePipe]
})
export class ThemePage implements OnInit {

  constructor( 
    public themeService: ThemeService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  async changeTheme(mode: ThemeMode) {
    this.themeService.setTheme(mode);
    await this.profileService.updateTheme(mode as ThemeMode);
  }

}
