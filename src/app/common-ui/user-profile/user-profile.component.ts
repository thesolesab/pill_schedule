import { Component, Input, SimpleChanges } from '@angular/core';
import { User, WeightEntry } from '../../data/interfaces/user.interface';
import { CommonModule, NgClass } from '@angular/common';
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  @Input() user?: User;
  weightNow: number | null = null
  imt: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    // Проверяем, были ли изменения в user
    if (changes['user'] && this.user) {
      this.calculateIMT();  // Вычисляем ИМТ при изменении user
    }
  }

  imtDescr = [
    { range: [0, 16], message: 'выраженный дефицит массы тела' },
    { range: [16, 17.9], message: 'недостаточная масса тела' },
    { range: [18, 24.9], message: 'нормальный вес' },
    { range: [25, 29.9], message: 'избыточная масса тела (предожирение)' },
    { range: [30, 34.9], message: 'ожирение 1 степени' },
    { range: [35, 39.9], message: 'ожирение 2 степени' },
    { range: [40, 100], message: 'ожирение 3 степени (морбидное)' },
  ]

  constructor(
    private indexedDbService: IndexedDbService,
  ) { }

  calculateIMT() {
    if (this.user && this.user.weightHistory?.length > 0 && this.user.userHeight) {
      const lastWeight = this.user.weightHistory.at(-1)?.weight;
      const heightInMeters = this.user.userHeight / 100;

      if (lastWeight && heightInMeters > 0) {
        this.imt = Math.round(lastWeight / (heightInMeters ** 2));
      } else {
        this.imt = 0;
      }
    } else {
      this.imt = 0;
    }
  }

  onBlur() {
    this.weightNow = null
  }



  getIMTDescription(): string {
    const description = this.imtDescr.find(item => this.imt >= item.range[0] && this.imt <= item.range[1]);
    return description ? description.message : 'Неизвестно';
  }

  updateWeight() {
    if (this.weightNow) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const weightObj: WeightEntry = {
        weight: this.weightNow,
        date: formattedDate
      }

      if (this.user?.weightHistory.at(-1)?.date !== weightObj.date) {
        this.user?.weightHistory.push(weightObj)
      } else {
        this.user.weightHistory.splice(-1, 1, weightObj)
      }
      this.calculateIMT()
      this.indexedDbService.updateData('user-store', this.user)
        .then(() => console.log('Пользователь обновлен в IndexedDB'))
        .catch(err => console.error('Ошибка обновления в IndexedDB:', err));
    }
  }
}
