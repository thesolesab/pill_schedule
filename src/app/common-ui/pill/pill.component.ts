import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.scss'
})
export class PillComponent {
  days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  selectedDays: string[] = [];
  doseValue: number | null = null;
  selectedUnit: string = 'мг';
  doseUnits: string[] = ['мг', 'таблетки', 'мл', 'капли'];

  toggleDay(day: string) {
    if (this.selectedDays.includes(day)) {
      this.selectedDays = this.selectedDays.filter(d => d !== day);
    } else {
      this.selectedDays.push(day);
    }
  }
}
