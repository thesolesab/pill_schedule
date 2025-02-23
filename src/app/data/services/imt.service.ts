import { Injectable } from '@angular/core';
import { WeightEntry } from '../../data/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ImtService {
  private imtDescr = [
    { range: [0, 16], message: 'выраженный дефицит массы тела' },
    { range: [16, 17.9], message: 'недостаточная масса тела' },
    { range: [18, 24.9], message: 'нормальный вес' },
    { range: [25, 29.9], message: 'избыточная масса тела (предожирение)' },
    { range: [30, 34.9], message: 'ожирение 1 степени' },
    { range: [35, 39.9], message: 'ожирение 2 степени' },
    { range: [40, 100], message: 'ожирение 3 степени (морбидное)' },
  ];

  calculateIMT(weightHistory: WeightEntry[], height: number | null): number {
    if (!weightHistory.length || !height) return 0;

    const lastWeight = weightHistory.at(-1)?.weight;
    const heightInMeters = height / 100;

    return lastWeight && heightInMeters > 0 ? Math.round(lastWeight / (heightInMeters ** 2)) : 0;
  }

  getIMTDescription(imt: number): string {
    const description = this.imtDescr.find(item => imt >= item.range[0] && imt <= item.range[1]);
    return description ? description.message : 'Неизвестно';
  }
}
