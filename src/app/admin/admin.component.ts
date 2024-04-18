import { Component } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  
  ngOnInit(): void {
    // const data = [
    //   { day: "design", count: 25 },
    //   { day: "performance", count: 30 },
    //   { day: "speed", count: 45 },
    //   // { day: "day 4", count: 20 },
    //   // { day: "day 5", count: 25 },
    //   // { day: "day 6", count: 30 },
    //   // { day: "day 7", count: 35 },
    // ];

    // new Chart(
    //   "myChart",
    //   {
    //     type: 'doughnut',
    //     data: {
    //       labels: data.map(row => row.day),
    //       datasets: [
    //         {
    //           label: 'a Incremental evaluation per day',
    //           data: data.map(row => row.count)
    //         }
    //       ]
    //     }
    //   }
    // );

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
