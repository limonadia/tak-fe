import { Component, OnInit, Input } from '@angular/core';
import { Chip } from '../../models/chip.model';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular';
import { ellipsisHorizontalOutline, closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  imports: [ IonChip, IonIcon, IonLabel ],
})
export class BadgesComponent  implements OnInit {
  @Input() chips: Chip[] = [];
  @Input() maxLength: number = 8;
  colors: string[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
  showAll: boolean = false;
  constructor() {
    addIcons({ ellipsisHorizontalOutline, closeOutline })
  }

  ngOnInit() {}

  getColor(index: number): string{
    return this.colors[index % this.colors.length];
  }

  toggleShowAll(){
    this.showAll = !this.showAll;
  }
}
