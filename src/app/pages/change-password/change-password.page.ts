import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonInputPasswordToggle, IonCard, IonCardContent, IonText, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, NavController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, TranslatePipe, CommonModule, FormsModule, IonInputPasswordToggle, IonText, ReactiveFormsModule, IonInput, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle ]
})
export class ChangePasswordPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private navCtrl: NavController
  ) {
    addIcons({ arrowBackOutline });
  }

  success: boolean = false;
  errorMessage: string = '';
  passwordForm = this.fb.group({
    password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    confirmPassword: ['', { validators: [Validators.required] }],
  }, { validators: passwordMatchValidator })

  ngOnInit() {
  }

  async submit(){
    if (!this.passwordForm.valid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    try {
      const password = this.passwordForm.get('password')?.value;
      if(password) {
        await this.authService.updatePassword(password, "");
        this.success = true;
      }
    } catch (error: any) {
      console.error(error);
      this.errorMessage = this.translate.instant('errors.went-wrong');
      //TODO implement toast notification
    }
    this.cdr.detectChanges();
  }
  back(){
    this.router.navigate(['/tabs/profile']);
  }

  async toHome(){
    await this.navCtrl.navigateRoot('/tabs/profile');
    await this.navCtrl.navigateRoot('/tabs/home');
    this.router.navigate(['/tabs/home']);
    this.errorMessage = '';
    this.success = false;
  }

}
