import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadioGroup, IonRadio, IonItem } from '@ionic/angular';
import { ThemeMode, ThemeService } from '../../services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonRadioGroup, IonRadio, IonItem, CommonModule, FormsModule, TranslatePipe]
})
export class ThemePage implements OnInit {

  constructor( 
    public themeService: ThemeService
  ) { }

  ngOnInit() {
  }

  changeTheme(mode: ThemeMode): void {
    this.themeService.setTheme(mode);
  }

}
