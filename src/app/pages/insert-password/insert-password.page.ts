import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInputPasswordToggle, IonInput, IonButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-insert-password',
  templateUrl: './insert-password.page.html',
  styleUrls: ['./insert-password.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonText, CommonModule, FormsModule, TranslatePipe, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInputPasswordToggle, IonInput, ReactiveFormsModule, IonButton]
})
export class InsertPasswordPage implements OnInit {

  constructor(private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  action: string = '';
  errorMessage: string = '';
  passwordForm = this.fb.group({
    password: ['',{ validators: [Validators.required] }]
  })

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.queryParamMap.get('action') || '';
  }

  async submit(){
    try {
      const res = await this.authService.VerifyPassword(this.passwordForm.value.password || '');
      if (res.valid) {
        this.errorMessage = '';
        const routePath = this.router.url.split('/insert-password')[0];
        this.router.navigate([routePath + '/'+ this.action]);
      }
    } catch (error) {
      this.errorMessage = 'Password is incorrect. Please try again.';
    }
    this.cdr.detectChanges();
  }

}
