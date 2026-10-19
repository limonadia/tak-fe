import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { IonButton, IonIcon, IonLabel } from '@ionic/angular';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CarouselModule, IonButton, IonIcon, NgClass, IonLabel, TranslatePipe],
})
export class CarouselComponent implements OnInit {
  @ViewChild('carouselWrapper') carouselWrapper?: ElementRef<HTMLElement>;
  @Input() carouselData: { id: string, items: any[], title: string } = { id: '', items: [], title: ''}; 
  @Output() buttonClick = new EventEmitter<string>();
  isHovered = false;
  private hideTimeout?: ReturnType<typeof setTimeout>;
  items = [1, 2, 3, 4, 5];
  title = "Event Title"
  buttonText = "View All"

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
  }

  onButtonClick(){
    this.buttonClick.emit();
  }

  showControls(): void {
    this.isHovered = true;
    this.scheduleHide();
  }
  onMouseLeave(): void {
    this.scheduleHide();
  }

  onOutsideClick(): void {
    this.hideControls();
  }

  private scheduleHide(): void {
    this.clearHideTimeout();

    this.hideTimeout = setTimeout(() => {
      this.isHovered = false;
      this.hideTimeout = undefined;
      this.cdr.detectChanges();
    }, 300);
  }

  private hideControls(): void {
    this.clearHideTimeout();
    this.isHovered = false;
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout !== undefined) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }
}