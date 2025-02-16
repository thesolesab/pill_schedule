import { Component, Input, SimpleChanges } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pill } from '../../data/interfaces/pill.interface';
import { IndexedDbService } from '../../data/services/indexed-db.service';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.scss'
})
export class PillComponent {
  @Input() pill!: Pill;

  days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  selectedDays: string[] = [];
  doseValue: number | null = null;
  selectedUnit: string = 'мг';
  doseUnits: string[] = ['мг', 'таблетки', 'мл', 'капли'];

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pill'] && this.pill) {
      this.selectedDays = this.pill.selectedDays || [];
      this.doseValue = this.pill.doseValue || null;
      this.selectedUnit = this.pill.selectedUnit || 'мг';
    }
  }

  toggleDay(day: string) {
    if (this.pill.selectedDays.includes(day)) {
      this.pill.selectedDays = this.pill.selectedDays.filter(d => d !== day);
    } else {
      this.pill.selectedDays.push(day);
    }
    this.updatePill();
  }

  updatePill() {
    if (this.pill) {
      this.pill.selectedDays = this.selectedDays;
      this.pill.doseValue = this.doseValue;
      this.pill.selectedUnit = this.selectedUnit;

      this.indexedDbService.updateData('pills-store', this.pill)
        .then(() => console.log('Таблетка обновлена в IndexedDB'))
        .catch(err => console.error('Ошибка обновления в IndexedDB:', err));
    }
  }
}
