import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Output() pillDeleted = new EventEmitter<void>();

  isExpanded = true;
  expandedHeight = '200px'; // Высота в раскрытом состоянии
  items = ['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'];
  days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  doseUnits: string[] = ['мг', 'таблетки', 'мл', 'капли'];

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pill'] && this.pill) {
      this.pill.selectedDays ||= [];
      this.pill.doseValue ||= null;
      this.pill.selectedUnit ||= 'мг';
    }
  }

  ngOnInit() {
    console.log(!this.pill.notifications);
  }

  toggleDay(day: string) {
    const index = this.pill.selectedDays.indexOf(day);
    index > -1 ? this.pill.selectedDays.splice(index, 1) : this.pill.selectedDays.push(day);
    this.updatePill();
  }

  updatePill() {
    this.indexedDbService.updateData('pills-store', this.pill)
      .then(() => console.log('Таблетка обновлена в IndexedDB'))
      .catch(err => console.error('Ошибка обновления в IndexedDB:', err));
  }

  deletePill() {
    this.indexedDbService.deleteData('pills-store', this.pill.pillName)
      .then(() => this.pillDeleted.emit())
      .catch(err => console.error('Ошибка удаления из IndexedDB:', err));
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.items.push('Новый элемент');
    }
  }

  addNotify() {
    if (!this.pill.notifications) {
      this.pill.notifications = []
    }
    this.pill.notifications.push('00:00')
    this.updatePill()
  }

  deleteNotify(index: number) {
    this.pill.notifications?.splice(index, 1)
  }
}
