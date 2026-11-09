import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInput, IonInputPasswordToggle, IonText } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, ReactiveFormsModule, CommonModule, FormsModule, TranslatePipe, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInput, IonInputPasswordToggle, IonText]
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }

  success: boolean = false;
  errorMessage: string = '';
  passwordForm = this.fb.group({
    password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    confirmPassword: ['', { validators: [Validators.required] }],
  }, { validators: passwordMatchValidator })
  token: string = '';

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token')!;
  }

  async submit(){
    if (!this.passwordForm.valid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    try {
      const password = this.passwordForm.get('password')?.value;
      if(password) {
        await this.authService.updatePassword(password, this.token);
        this.success = true;
      }
    } catch (error: any) {
      console.error(error);
      this.errorMessage = this.translate.instant('errors.went-wrong');
      //TODO implement toast notification
    }
    this.cdr.detectChanges();
  }

  toLogin(){
    this.router.navigate(['/login'])
  }

}
