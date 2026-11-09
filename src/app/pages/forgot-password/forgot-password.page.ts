import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonText, IonButton } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, TranslatePipe, CommonModule, FormsModule, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, ReactiveFormsModule, IonInput, IonText, IonButton]
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  success: boolean = false;
  errorMessage: string = '';
  emailForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }]
  })
  ngOnInit() {
  }

  async submit(){
    if(!this.emailForm.valid){
      this.emailForm.markAllAsTouched();
      return;
    }

    try {
      const email = this.emailForm.get('email')?.value;
      if (email){
        await this.authService.sendVerificationEmail(email, "password");
        this.success = true;
      }
    } catch (error) {
      this.errorMessage = this.translate.instant('errors.went-wrong')  
    }
    this.cdr.detectChanges();
  }

  back(){
    this.router.navigate(['/login'])
    this.success = false;
    this.errorMessage = '';
    this.emailForm.patchValue({
      email: ''
    })
  }

}
