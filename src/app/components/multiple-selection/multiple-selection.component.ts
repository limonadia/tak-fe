import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular';
import { NgClass } from '@angular/common';
import { Chip } from '../../models/chip.model';

@Component({
  selector: 'app-multiple-selection',
  templateUrl: './multiple-selection.component.html',
  styleUrls: ['./multiple-selection.component.scss'],
  imports: [ IonChip, IonIcon, IonLabel, NgClass ],
})
export class MultipleSelectionComponent  implements OnInit {
  @Input() chips: Chip[] = [];
  @Output() selectItems = new EventEmitter<Chip[]>();
  colors: string[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
  selectedChips: Chip[] = [];
  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chips']) {
      this.preselectedChips();
    }
  }

  getColor(index: number): string{
    return this.colors[index % this.colors.length];
  }

  toggleSelection(id: number){
    const chip = this.chips.find(item => item.id === id);

    if (!chip) return;

    if (chip.selected){
      chip.selected = false;
      this.selectedChips = this.selectedChips.filter(item => item.id !== id);
    } else {
      chip.selected = true;
      this.selectedChips.push(chip);
    }

    this.selectItems.emit(this.selectedChips);
  }

  preselectedChips(){
    this.selectedChips = this.chips.filter(chip => chip.selected);
    this.selectItems.emit([...this.selectedChips]);
  }
}
