import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent {

  viewChart: boolean = true;

  ngOnInit(): void {
    const data = [
      { day: "design", count: 25 },
      { day: "performance", count: 30 },
      { day: "speed", count: 45 },
    ];

    new Chart(
      "myChart",
      {
        type: 'doughnut',
        data: {
          labels: data.map(row => row.day),
          datasets: [
            {
              label: 'a Incremental evaluation per day',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
}
