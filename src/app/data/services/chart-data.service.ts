import { Injectable } from '@angular/core';
import { ImtEntry, WeightEntry } from '../interfaces/user.interface';
import { ChartDataset } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  getWeightDataset(weightHistory: WeightEntry[]): ChartDataset<'line'> {
    return {
      data: weightHistory.map(el => el.weight),
      label: 'ВЕС',
      borderColor: 'rgb(60, 255, 0)',
      backgroundColor: 'rgba(60, 255, 0, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(60, 255, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(60, 255, 0)',
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointStyle: 'circle',
      yAxisID: 'y'
    };
  }

  getImtDataset(weightHistory: ImtEntry[]): ChartDataset<'line'> {
    return {
      data: weightHistory.map(el => el.imt), // Например, другой график сдвинут на -2
      label: 'ИМТ',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
      fill: false,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointStyle: 'triangle',
      yAxisID: 'y2'
    };
  }
}
