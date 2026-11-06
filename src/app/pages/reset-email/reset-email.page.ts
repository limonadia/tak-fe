import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, TranslatePipe, IonButton]
})
export class ResetEmailPage implements OnInit {

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.profileService.getProfile();
  }

  toHome(){
    this.router.navigate(['tabs/home'])
  }
}
