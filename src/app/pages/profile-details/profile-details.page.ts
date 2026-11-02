import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormControl } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonLabel, IonToolbar, IonBackButton, IonCard, IonCardContent, IonInput, IonAvatar, IonIcon, IonButton, IonTextarea } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { createOutline, trashOutline } from 'ionicons/icons';
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
  removeProfilePicture = false;
  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private interestsService: InterestsService
  ) {
    addIcons({ createOutline, trashOutline });
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

  async loadUser() {
    this.user = this.profileService.userObject;

    this.profileService.removeImage(this.imagePreview);
    this.imagePreview = this.profileService.profileP;

    this.selectedImage = null;
    this.removeProfilePicture = false;

    const userPreferences = await this.interestsService.getPreferences();

    this.preferences = this.turnToChips(userPreferences);

    const userPreferencesID = this.preferences.map(chip => chip.id);

    this.chips = this.turnToChips(
      this.interestsService.interests,
      userPreferencesID
    );

    this.profileForm.patchValue({
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      city: this.user.city,
      birthday: this.user.birthday?.replace('T00:00:00Z', ''),
      description: this.user.description,
      preferences: userPreferencesID
    });
     
    this.cdr.detectChanges();
  }

  turnToChips(items: Interest[], preselectedIDs?: number[]): Chip[]{
    return items.map(item => ({
      ...item,
      selected: preselectedIDs ? (preselectedIDs.includes(item.id) ? true : false) : false
    }))
  }

  selectImage(event: Event) {
    const imageFile = this.profileService.onImageSelected(
      event,
      this.imagePreview
    );

    if (!imageFile) return;

    this.selectedImage = imageFile;
    this.imagePreview = URL.createObjectURL(imageFile);
    this.removeProfilePicture = false;
  }

  removeImage(){
    this.profileService.removeImage(this.imagePreview);
    this.selectedImage = null;
    this.imagePreview = null;
    this.removeProfilePicture = true;
  }

  selectedItems(event: Chip[]){
    const selectedIDs = event.map(chip => chip.id);
    this.profileForm.get('preferences')?.setValue(selectedIDs);
    this.profileForm.get('preferences')?.markAsDirty();
  }
  async submit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    const profileData = {
      firstname: this.profileForm.value.firstName,
      lastname: this.profileForm.value.lastName,
      city: this.profileForm.value.city,
      birthday: this.profileForm.value.birthday,
      description: this.profileForm.value.description,
      preferences: this.profileForm.value.preferences,
      removeProfilePicture: this.removeProfilePicture
    };

    formData.append('user', JSON.stringify(profileData));

    if (this.selectedImage) {
      formData.append('profilePicture', this.selectedImage);
    }

    try {
      await this.profileService.updateProfile(formData);

      this.editProfile = false;

      await this.profileService.getProfile();
      await this.loadUser();

    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }

  onCancel() {
    this.profileForm.reset({
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      city: this.user.city,
      birthday: this.user.birthday?.replace('T00:00:00Z', ''),
      description: this.user.description,
      preferences: this.preferences.map(chip => chip.id)
    });

    this.editProfile = false;
  }
  toggleEdit(){
    this.editProfile = !this.editProfile;
    this.cdr.detectChanges();
  }

}
