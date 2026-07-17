import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siAngular, siTypescript, siDotnet, siSharp, siChartdotjs } from 'simple-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly icons = {
    angular: { icon: siAngular, label: 'Angular 21', description: 'Modern standalone frontend with responsive forms and routing.' },
    dotnet: { icon: siDotnet, label: '.NET 9', description: 'ASP.NET Core Web API that securely coordinates NASA POWER requests.' },
    chartjs: { icon: siChartdotjs, label: 'Chart.js', description: 'Responsive line charts for visualizing daily temperature trends.' },
    typescript: { icon: siTypescript, label: 'TypeScript', description: 'Typed UI components, services and data models.' },
    csharp: { icon: siSharp, label: 'C#', description: 'Clean backend controllers, services and location models.' }
  };
}
