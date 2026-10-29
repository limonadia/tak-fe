import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonTitle, IonCard, IonCardContent, IonLabel, IonInput, IonAvatar, IonInputPasswordToggle, IonNote, IonIcon, IonText, IonButton, IonTextarea } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { chevronForwardOutline, chevronBackOutline, trashOutline, createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MultipleSelectionComponent } from '../../components/multiple-selection/multiple-selection.component';
import { Chip } from '../../models/chip.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { InterestsService } from '../../services/interests.service';
import { ProfileService } from '../../services/profile.service';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [IonContent, IonTitle, CommonModule, FormsModule, IonCard, IonButton, IonAvatar, IonCardContent, MultipleSelectionComponent, ReactiveFormsModule, IonTextarea, TranslatePipe, IonText, IonLabel, MatStepperModule, IonInput, IonNote, IonInputPasswordToggle, IonIcon]
})
export class SignupPage implements OnInit {
  @ViewChild('cityAutocompleteHost')
  cityAutocompleteHost!: ElementRef<HTMLDivElement>;

  signupForm = this.fb.group({
    formArray: this.fb.array([
      this.fb.group({
        email: ['', { validators: [Validators.required, Validators.email] }],
        password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
        confirmPassword: ['', { validators: [Validators.required] }],
      }, { validators: passwordMatchValidator }),
      this.fb.group({
        firstName: ['', { validators: [Validators.required] }],
        lastName: ['', { validators: [Validators.required] }],
        city: ['', { validators: [Validators.required] }],
        birthday: ['', { validators: [Validators.required] }],
      }),
      this.fb.group({
        profilePicture: [''],
        description: ['', { validators: [Validators.required, Validators.minLength(20)] }]
      }),
      this.fb.group({
        preferences: [[], { validators: [Validators.required, Validators.minLength(1)] }]
      })
    ])
  })

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  chips: Chip[] = [];
  errorText: string = '';
  showError: boolean = false;
  maxBirthday: string = this.profileService.getMaxBirthday(18);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private authService: AuthService,
    private interestsService: InterestsService,
    private profileService: ProfileService,
    private googleMapsLoader: GoogleMapsLoaderService ) {
    addIcons({ chevronBackOutline, chevronForwardOutline, trashOutline, createOutline });
  }

  ngOnInit() {
    this.loadChips();
  }
  
  async ngAfterViewInit(): Promise<void> {
    await this.setupCityAutocomplete();
  }

  async setupCityAutocomplete(): Promise<void> {
    try {
      const places = await this.googleMapsLoader.loadPlaces();
      const autocomplete = new places.PlaceAutocompleteElement();

      autocomplete.includedPrimaryTypes = ['locality'];
      autocomplete.placeholder = 'Search for a city';

      this.cityAutocompleteHost.nativeElement.replaceChildren(autocomplete);
      autocomplete.addEventListener('gmp-select', async (event: Event) => {
        try {
          const placePrediction = (event as any).placePrediction;
          if (!placePrediction) {
            console.error('No placePrediction found on event');
            return;
          }

          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ['displayName', 'id']
          });

          this.ngZone.run(() => {
            this.personalForm.patchValue({
              city: place.displayName ?? ''
            });
          });
        } catch (error) {
          console.error('City selection failed:', error);
        }
      });
    } catch (error) {
      console.error('Failed to initialize Google Places:', error);
    }
  }

  async loadChips(){
    let interests = await this.interestsService.getInterests();
    this.chips = interests.map(interest => ({
      ...interest,
      selected: false
    }))
  }
  login(){
    this.router.navigate(['/login']);
  }

  get formArray(): FormArray {
    return this.signupForm.get('formArray') as FormArray;
  }

  get accountForm() {
    return this.formArray.at(0);
  }

  get personalForm() {
    return this.formArray.at(1);
  }

  get aboutForm() {
    return this.formArray.at(2);
  }

  get preferencesForm() {
    return this.formArray.at(3);
  }

  async onSignup() {
    if (this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
      return;
    }

    const preferences = this.preferencesForm.get('preferences')?.value.map((chip: Chip) => chip.id);
    const formData: User = {
      email: this.accountForm.get('email')?.value,
      password: this.accountForm.get('password')?.value,
      firstname: this.personalForm.get('firstName')?.value,
      lastname: this.personalForm.get('lastName')?.value,
      city: this.personalForm.get('city')?.value,
      birthday: `${this.personalForm.get('birthday')?.value}T00:00:00Z`,
      description: this.aboutForm.get('description')?.value,
      preferences: preferences
    }

    const request = new FormData();
    request.append('user', JSON.stringify(formData));

    if(this.selectedImage) {
      request.append(
        'profilePicture',
        this.selectedImage,
        this.selectedImage.name
      );
    }

    try {
      console.log("request", request)
      await this.authService.Signup(request);
      this.router.navigate(['/login']);
      //TODO add popup to say that account was created succesffully
    } catch (error) {
      console.error('Signup failed:', error);
      //TODO add popup to say that something went wrong please try again later (could not create token & invalid request)
    }  
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
  this.preferencesForm.get('preferences')?.setValue(event);
}
}
