import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User, WeightEntry } from '../../data/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { FormsModule } from '@angular/forms';
import { ImtService } from '../../data/services/imt.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  @Input() user?: User;
  @Output() weightHistoryUpdated = new EventEmitter<WeightEntry[]>();

  weightNow: number | null = null;
  imt: number = 0;

  constructor(
    private indexedDbService: IndexedDbService,
    private imtService: ImtService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.updateIMT();
    }
  }

  updateIMT() {
    if (this.user) {
      this.imt = this.imtService.calculateIMT(this.user.weightHistory, this.user.userHeight);
    }
  }

  onBlur() {
    this.weightNow = null;
  }

  getIMTDescription(): string {
    return this.imtService.getIMTDescription(this.imt);
  }

  updateWeight() {
    if (this.weightNow) {
      const date = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const weightObj: WeightEntry = { weight: this.weightNow, date };

      const updatedWeightHistory = [...this.user!.weightHistory];
      if (this.user?.weightHistory.at(-1)?.date !== weightObj.date) {
        updatedWeightHistory.push(weightObj);
      } else {
        updatedWeightHistory.splice(-1, 1, weightObj);
      }

      this.user!.weightHistory = updatedWeightHistory;

      this.updateIMT();
      this.weightHistoryUpdated.emit(this.user!.weightHistory);

      this.indexedDbService.updateData('user-store', this.user)
        .then(() => console.log('Пользователь обновлен в IndexedDB'))
        .catch(err => console.error('Ошибка обновления в IndexedDB:', err));
    }
  }
}
