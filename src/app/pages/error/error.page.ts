import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslatePipe, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton]
})
export class ErrorPage implements OnInit {
  reason: string | null = '';
  errorDescription: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.reason = this.activatedRoute.snapshot.queryParamMap.get('reason')!;

    if (this.reason != null){
      const errorText = `profile.${this.reason}`;
      this.translate.get(errorText).subscribe(translation => {
        this.errorDescription = translation;
      });
    } else {
      this.translate.get('profile.went-wrong').subscribe(translation => {
        this.errorDescription = translation
      });
    }
    this.cdr.detectChanges();
  }

  toHome(){
    this.router.navigate(['tabs/home'])
  }
}
