import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ImtEntry, WeightEntry } from '../../data/interfaces/user.interface';
import { ChartConfigService } from '../../data/services/chart-config.service';
import { ChartDataService } from '../../data/services/chart-data.service';
import { ImtService } from '../../data/services/imt.service';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.scss'
})
export class UserChartComponent implements OnInit, OnChanges {
  @Input() weightHistory!: WeightEntry[];
  @Input() userHeight!: number;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  imtHistory: ImtEntry[] = []

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions;
  public lineChartLegend = true;

  constructor(
    public chartConfigService: ChartConfigService,
    private chartDataService: ChartDataService,
    private imtService: ImtService
  ) {
    this.lineChartOptions = this.chartConfigService.getChartOptions();
  }

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weightHistory'] && this.weightHistory) {
      this.imtHistory = this.weightHistory.map(el => ({
        imt: this.imtService.calculateIMT([el], this.userHeight),
        date: el.date
      }))

      this.updateChartData();
      this.chart?.update();
    }
  }

  private updateChartData() {
    this.lineChartData = {
      labels: this.weightHistory.map(el => el.date),
      datasets: [
        this.chartDataService.getWeightDataset(this.weightHistory),
        this.chartDataService.getImtDataset(this.imtHistory)
      ]
    };
  }
}
