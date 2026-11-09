import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonText, IonInput, IonCardSubtitle, NavController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, ReactiveFormsModule, IonText, IonInput, CommonModule, FormsModule, TranslatePipe, IonCardSubtitle]
})
export class ChangeEmailPage implements OnInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private navCtrl: NavController
  ) {
    addIcons({ arrowBackOutline });
  }

  errorMessage: string = '';
  success: boolean = false;
  emailForm = this.fb.group({
    email: ['',{ validators: [Validators.required, Validators.email] }]
  })

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/tabs/profile']);
  }

  async submit(){
    if (this.emailForm.invalid) {
      return;
    }

    try {
      let email = this.emailForm.value.email
      if (email) {
        await this.authService.sendVerificationEmail(email.toString(), "email")
        this.success = true;
      }
    } catch (error: any) {
      if (error.toString().includes("Email already exists")){
        this.errorMessage = this.translate.instant('errors.email-exists');
      } else {
        this.errorMessage = this.translate.instant('errors.went-wrong');
      }
    }
    this.cdr.detectChanges();
    
  }

  async toHome(){
    await this.navCtrl.navigateRoot('/tabs/profile');
    await this.navCtrl.navigateRoot('/tabs/home');
    this.router.navigate(['/tabs/home']);
    this.errorMessage = '';
    this.success = false;
  }

}
