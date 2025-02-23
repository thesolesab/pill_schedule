import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartConfigService {
  getChartOptions(): ChartOptions<'line'> {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: 'white' }
        },
        title: {
          display: true,
          text: 'Журнал',
          color: 'white',
          font: { size: 16 }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad'
      },
      scales: {
        x: {
          title: { display: true, text: 'Дата', color: 'white' },
          ticks: { color: 'white' },
          grid: { color: 'rgba(238, 255, 0, 0.1)', lineWidth: 1 }
        },
        y: {
          title: { display: true, text: 'Вес (кг)', color: 'white' },
          ticks: { color: 'white' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y2: {
          position: 'right',  // Разместить справа
          title: { display: true, text: 'ИМТ', color: 'lightblue' },
          ticks: { color: 'lightblue' },
          grid: { drawOnChartArea: false } // Убирает сетку для ИМТ
        }
      }
    };
  }
}
