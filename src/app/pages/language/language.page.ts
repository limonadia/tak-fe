import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadio, IonRadioGroup, IonItem } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadio, IonRadioGroup, IonItem, CommonModule, FormsModule, TranslatePipe]
})
export class LanguagePage implements OnInit {

  constructor(public translateService: TranslateService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  async switchLanguage(lang: string) {
    this.translateService.use(lang);
    await this.profileService.updateLanguage(lang);
  }

}
