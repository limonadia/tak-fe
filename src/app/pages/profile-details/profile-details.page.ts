import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormControl } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonLabel, IonToolbar, IonBackButton, IonCard, IonCardContent, IonInput, IonAvatar, IonIcon, IonButton, IonTextarea } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MultipleSelectionComponent } from '../../components/multiple-selection/multiple-selection.component';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { InterestsService } from '../../services/interests.service';
import { Chip, Interest } from '../../models/chip.model';
import { BadgesComponent } from '../../components/badges/badges.component';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonLabel, ReactiveFormsModule, FormsModule, IonBackButton, TranslatePipe, IonCard, IonCardContent, IonInput, IonAvatar, IonIcon, IonButton, IonTextarea, MultipleSelectionComponent, BadgesComponent]
})
export class ProfileDetailsPage implements OnInit {
  editProfile: boolean = false;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  user: User = {};
  maxBirthday: string = this.profileService.getMaxBirthday(18);
  chips: Chip[] = [];
  preferences: Chip[] = [];
  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private interestsService: InterestsService
  ) {
    addIcons({ createOutline });
  }

  profileForm = this.fb.group({
    firstName: ['', { validators: [Validators.required] }],
    lastName: ['', { validators: [Validators.required] }],
    city: ['', { validators: [Validators.required] }],
    birthday: ['', { validators: [Validators.required] }],
    profilePicture: [''],
    description: ['', { validators: [Validators.required, Validators.minLength(20)] }],
    preferences: new FormControl<number[]>([], { validators: [Validators.required, Validators.minLength(1)] })
  })
  ngOnInit() {
    this.loadUser();
  }

  async loadUser(){
    this.user = this.profileService.userObject;

    if(this.profileService.profileP){
      this.imagePreview = this.profileService.profileP;
    }

    let userPreferences = await this.interestsService.getPreferences();
    this.preferences = this.turnToChips(userPreferences);
    const userPreferencesID = this.preferences.map((chip: Chip) => chip.id);

    let interests = await this.interestsService.getInterests();
    this.chips = this.turnToChips(interests, userPreferencesID);

    this.profileForm.patchValue({
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      city: this.user.city,
      birthday: this.user.birthday?.replace("T00:00:00Z", ""),
      description: this.user.description,
      preferences: userPreferencesID
    })
    
    this.cdr.detectChanges();
  }

  turnToChips(items: Interest[], preselectedIDs?: number[]): Chip[]{
    return items.map(item => ({
      ...item,
      selected: preselectedIDs ? (preselectedIDs.includes(item.id) ? true : false) : false
    }))
  }

  selectImage(event: Event){
    const imageFile = this.profileService.onImageSelected(event, this.imagePreview);
    this.selectedImage = imageFile;
    this.imagePreview = URL.createObjectURL(imageFile);
  }

  removeImage(){
    this.profileService.removeImage(this.imagePreview);
    this.selectedImage = null;
    this.imagePreview = null;
  }

  selectedItems(event: Chip[]){
    // this.profileForm.get('preferences')?.setValue(event);
  }

}
