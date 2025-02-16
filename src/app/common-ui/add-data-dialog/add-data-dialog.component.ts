import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { Pill } from '../../data/interfaces/pill.interface';

@Component({
  selector: 'app-add-data-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './add-data-dialog.component.html',
  styleUrl: './add-data-dialog.component.scss'
})
export class AddDataDialogComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private indexedDbService: IndexedDbService) { }

  form = new FormGroup({
    pillName: new FormControl(null, Validators.required),
  });

  async onSubmit() {
    if (this.form.valid) {
      const newPill = {
        pillName: this.form.value.pillName!,
        doseValue: null,
        selectedDays: [],
        selectedUnit: 'мг',
      };

      await this.indexedDbService.addData('pills-store', newPill);
      this.close.emit(); // Сообщаем MainPageComponent, что нужно обновить список
    }
  }
}
