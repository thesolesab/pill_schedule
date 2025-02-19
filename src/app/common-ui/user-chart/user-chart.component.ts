import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { WeightEntry } from '../../data/interfaces/user.interface';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.scss'
})
export class UserChartComponent {
  @Input() weightHistory!: WeightEntry[];

  // Данные для графика
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  ngOnChanges(changes: SimpleChanges) {
    // Проверяем, были ли изменения в weightHistory
    if (changes['weightHistory'] && this.weightHistory) {
      this.updateChartData();
    }
  }

  // Опции графика
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  // Легенда
  public lineChartLegend = true;

  ngOnInit(): void {
    Chart.register(...registerables);
  }


  private updateChartData() {
    this.lineChartData = {
      labels: this.weightHistory.map(el => el.date), // Используем даты как метки
      datasets: [
        {
          data: this.weightHistory.map(el => el.weight), // Используем вес как данные
          label: 'Weight History',
          borderColor: 'white',
          backgroundColor: 'rgb(60, 255, 0)',
        }
      ]
    };
  }
}
