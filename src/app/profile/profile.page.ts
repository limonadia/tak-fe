import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { IonHeader, IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonList, IonIcon, IonModal, IonTitle, IonInput, IonText } from '@ionic/angular';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { arrowForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmDeletionValidator } from '../validators/confirm-deletion.validator';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonHeader, IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonList, IonIcon, NavbarComponent, TranslatePipe, CommonModule, IonText, IonModal, ReactiveFormsModule, IonTitle, IonInput, FormsModule],
})
export class ProfilePage {
  private translate = inject(TranslateService);
  public listItems = [
    { title: 'profile.connections', goTo: 'connections' },
    { title: 'profile.language', goTo: 'language' },
    { title: 'profile.theme', goTo: 'theme' },
    { title: 'profile.analytics', goTo: 'analytics' },
    { title: 'profile.blocked-users', goTo: 'blocked-users' },
    { title: 'profile.change-email', goTo: 'insert-password', queryParams: { action: 'change-email' } },
    { title: 'profile.change-password', goTo: 'insert-password', queryParams: { action: 'change-password' } },
    { title: 'profile.logout', goTo: 'logout' },
    { title: 'profile.delete-account', goTo: 'delete-account' }
  ]
  user: User = {};
  profilePicture: any;
  isModalOpen = false;
  @ViewChild('logoutModal') logoutModal!: IonModal;
  @ViewChild('deleteModal') deleteModal!: IonModal;
  @ViewChild('deletePermanentModal') deletePermanentModal!: IonModal;
  confirmForm = this.fb.group({
    confirm: ['', { validators: [Validators.required] }]
  }, { validators: confirmDeletionValidator(this.translate) })

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    addIcons({ arrowForwardOutline });
  }

  ionViewWillEnter(){
    this.loadUser();
  }

  async loadUser(){
    try {
      await this.profileService.getProfile();
      this.user = this.profileService.userObject;
      this.profilePicture = this.profileService.profileP;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Failed to load profile:', error);
      //TODO popup notification unable to load user data
    }
  }

  async navigateTo(url: string, queryParams?: any) {
    if(url === 'logout') {
      await this.logoutModal.present();
    } else if(url === 'delete-account') {
      await this.deleteModal.present();
    } else {
      this.router.navigate([this.router.url.toString() + '/' + url], { queryParams });
    }
  }

  cancel(modal: string) {
      if (modal === 'logoutModal'){
        this.logoutModal.dismiss(null, 'cancel');
      } else if (modal === 'deleteModal'){
        this.deleteModal.dismiss(null, 'cancel');
      } else if (modal === 'deletePermanentModal'){
        this.deletePermanentModal.dismiss(null, 'cancel');
      }
    }
  
  async confirm(modal:string) {
    if (modal === 'logoutModal'){
      await this.authService.Logout();
      this.router.navigate(['/login']);
      this.logoutModal.dismiss('Logout', 'confirm');
    } else if (modal === 'deleteModal'){
      this.deleteModal.dismiss('Confirm Delete', 'confirm');
      await this.deletePermanentModal.present();
    } else if (modal === 'deletePermanentModal'){
      if(!this.confirmForm.valid){
        this.confirmForm.markAllAsTouched();
        return;
      }
      this.deletePermanentModal.dismiss('Delete Permanently', 'confirm');
      await this.authService.deleteAccount();
      this.router.navigate(["/login"]);
    }
  }

}
