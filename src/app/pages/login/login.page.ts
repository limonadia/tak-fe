import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonTitle, IonCard, IonCardContent, IonInputPasswordToggle, IonButton, IonInput, IonLabel } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonTitle, CommonModule, FormsModule, IonCard, IonCardContent, ReactiveFormsModule, IonInputPasswordToggle, IonButton, IonInput, IonLabel, TranslatePipe ]
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router, 
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['',{ validators: [Validators.required] }]
  })
  errorText: string = '';
  showError: boolean = false;
  ngOnInit() {
  }
  async onLogin(){
    this.showError = false;
    if(this.loginForm.valid){
      const userData = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      let res: any;
      try {
        res = await this.authService.Login(userData);
      } catch (error: any) {
        res = error.toString();
        if (res.includes("Email does not exist")){
          this.errorText = "errors.email-no-exist";
          this.showError = true;
        } else if (res.includes("Invalid credentials")){
          this.errorText = "errors.incorrect-password";
          this.showError = true;
        } else {
          //TODO add popup to say that something went wrong please try again later (could not create token & invalid request)
        }

        this.cdr.detectChanges();
      }
      if (res.token) {
        this.authService.saveToken(res.token);
        await this.profileService.getProfile();
        this.router.navigate(['/tabs/home']);
      }
    }
  }

  forgotPassword(){
    console.log("forgot password")
    //TODO implement forgot password flow
  }

  signup(){
    this.router.navigate(['/signup']);
  }
}
