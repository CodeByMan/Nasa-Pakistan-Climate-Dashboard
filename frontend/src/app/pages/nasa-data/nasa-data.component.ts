import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { NasaDataService, TemperatureRecord } from '../../services/nasa-data.service';

@Component({
  selector: 'app-nasa-data',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective, DecimalPipe],
  templateUrl: './nasa-data.component.html',
  styleUrl: './nasa-data.component.scss'
})
export class NasaDataComponent implements OnInit {
  data: TemperatureRecord[] = [];
  locations: string[] = [];
  loading = true;
  error = '';

  location = '';
  startDate = '2025-01-01';
  endDate = '2025-01-05';
  dataType = 'T2M';

  readonly itemsPerPage = 20;
  currentPage = 1;

  readonly chartType: 'line' = 'line';
  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', usePointStyle: true, pointStyle: 'circle' }
      },
      tooltip: {
        backgroundColor: 'rgba(5, 8, 22, 0.96)',
        borderColor: 'rgba(96, 165, 250, 0.35)',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        padding: 12
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
        grid: { color: 'rgba(148, 163, 184, 0.08)' }
      },
      y: {
        ticks: { color: '#94a3b8', callback: value => `${value}°` },
        grid: { color: 'rgba(148, 163, 184, 0.08)' }
      }
    }
  };

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Temperature (°C)',
      fill: true,
      tension: 0.36,
      borderWidth: 2,
      borderColor: '#22d3ee',
      backgroundColor: 'rgba(34, 211, 238, 0.1)',
      pointBackgroundColor: '#60a5fa',
      pointBorderColor: '#dbeafe',
      pointRadius: 3,
      pointHoverRadius: 6
    }]
  };

  constructor(private readonly nasaService: NasaDataService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  get dataLabel(): string {
    return 'Temperature (°C)';
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.data.length / this.itemsPerPage));
  }

  get paginatedData(): TemperatureRecord[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  get averageTemperature(): number | null {
    if (!this.data.length) return null;
    return this.data.reduce((sum, item) => sum + item.value, 0) / this.data.length;
  }

  get minimumTemperature(): number | null {
    return this.data.length ? Math.min(...this.data.map(item => item.value)) : null;
  }

  get maximumTemperature(): number | null {
    return this.data.length ? Math.max(...this.data.map(item => item.value)) : null;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  onSubmit(): void {
    if (!this.location) {
      this.error = 'Please select a location.';
      return;
    }

    if (this.startDate > this.endDate) {
      this.error = 'Start date must be earlier than or equal to end date.';
      return;
    }

    this.currentPage = 1;
    this.fetchData();
  }

  formatDate(date: string): string {
    if (!/^\d{8}$/.test(date)) return date;
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(4, 6)) - 1;
    const day = Number(date.slice(6, 8));
    return new Intl.DateTimeFormat('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(Date.UTC(year, month, day)));
  }

  private loadLocations(): void {
    this.nasaService.getLocations().subscribe({
      next: locations => {
        this.locations = locations;
        this.location = locations[0] ?? '';
        if (this.location) this.fetchData();
      },
      error: () => {
        this.error = 'Unable to load the available cities. Confirm that the API is running.';
        this.loading = false;
      }
    });
  }

  private fetchData(): void {
    this.loading = true;
    this.error = '';
    this.data = [];

    this.nasaService.getNasaData(this.location, this.startDate, this.endDate, this.dataType)
      .subscribe({
        next: response => {
          this.data = Array.isArray(response) ? response : [];
          this.loading = false;
          this.updateChart();
        },
        error: () => {
          this.error = 'Unable to retrieve NASA climate data. Check the API and try again.';
          this.loading = false;
        }
      });
  }

  private updateChart(): void {
    this.chartData = {
      labels: this.data.map(item => this.formatDate(item.date)),
      datasets: [{
        ...this.chartData.datasets[0],
        data: this.data.map(item => item.value),
        label: this.dataLabel
      }]
    };
  }
}
