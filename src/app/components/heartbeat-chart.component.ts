import { Component, OnInit } from "@angular/core";
import { HeartbeatService } from '../services/heartbeat.service';
import { Chart } from "chart.js";
import { NgZone } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClientBoardService } from 'src/app/services/client-board.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-heartbeat-chart',
  templateUrl: "./heartbeat-chart.component.html"
})
export class HeartbeatChartComponent implements OnInit {
  public chartOptions: any[] = [];
  public heartbeats: any[] = [];
  public id!: string;
  public selectedDate: Date = new Date(); // Default selected date
  public availableDates: string[] = []; // Array of unique dates from the data

  public chart: any = null;
  updateInterval: number = 3000; // Update interval in milliseconds
  dataSubscription: Subscription = new Subscription;

  constructor(private heartbeatService: HeartbeatService, private ngZone: NgZone, private clientBoard: ClientBoardService) {
  }

  ngOnInit() {
    this.clientBoard.loadFromLocalStorage();
    this.id = this.clientBoard.id;
    this.getUniqueDates(); // Get the unique dates from the data
    this.startRealTimeUpdates();
  }

  getUniqueDates() {
    const clientId = parseInt(this.id); // Replace with the desired client ID

    this.heartbeatService.getClientHeartbeats(clientId).subscribe(
      (response: any[]) => {
        // Extract unique dates from the response
        const uniqueDates = [...new Set(response.map((heartbeat: any) => heartbeat.date_prelevement.split(' ')[0]))];
       
        // Sort the dates in descending order
        this.availableDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        // Select the latest date by default
        this.selectedDate = new Date(this.availableDates[0]);
        // this.selectedDate.setHours(0, 0, 0, 0);
        // Create the initial chart
        this.createChart();
      },
      (error: any) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  createChart() {
    const clientId = parseInt(this.id); // Replace with the desired client ID
  
    this.heartbeatService.getClientHeartbeats(clientId).subscribe(
      (response: any[]) => {
        // Filter the response to include only the selected date
        const filteredResponse = response.filter((heartbeat: any) => {
          const heartbeatDate = new Date(heartbeat.date_prelevement).setHours(0, 0, 0, 0);
          const selectedDate = new Date(this.selectedDate).setHours(0, 0, 0, 0);
          return heartbeatDate === selectedDate;
        });
  
        // Sort the response by date_prelevement in ascending order
        const sortedResponse = filteredResponse.sort((a, b) =>
          a.date_prelevement.localeCompare(b.date_prelevement)
        );
  
        const labels = sortedResponse.map((heartbeat: any) =>
          heartbeat.date_prelevement.split(' ')[1]
        );
        const data = sortedResponse.map((heartbeat: any) => heartbeat.data1);
  
        // Clear previous chart data
        if (this.chart) {
          this.chart.destroy();
        }
  
        // Create the chart using the extracted data
        const canvas = document.getElementById("MyChart") as HTMLCanvasElement;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            this.chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Heartbeat',
                    data: data,
                    borderColor: 'red',
                    backgroundColor: 'red',
                  },
                ],
              },
              options: {
                aspectRatio: 8,
                scales: {
                  x: {
                    display: false, // Hide the x-axis labels
                  },
                },
              },
            });
          }
        }
      },
      (error: any) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }
  
  startRealTimeUpdates() {
    const clientId = parseInt(this.id); // Replace with the desired client ID
  
    // Clear any existing subscription
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  
    // Start the real-time update process
    this.dataSubscription = timer(0, this.updateInterval).pipe(
      switchMap(() => this.heartbeatService.getClientHeartbeats(clientId))
    ).subscribe(
      (response: any[]) => {
        // Filter the response to include only the selected date
        const filteredResponse = response.filter((heartbeat: any) => {
          const heartbeatDate = new Date(heartbeat.date_prelevement).setHours(0, 0, 0, 0);
          const selectedDate = new Date(this.selectedDate).setHours(0, 0, 0, 0);
          return heartbeatDate === selectedDate;
        });
  
        // Sort the response by date_prelevement in ascending order
        const sortedResponse = filteredResponse.sort((a, b) =>
          a.date_prelevement.localeCompare(b.date_prelevement)
        );
  
        const labels = sortedResponse.map((heartbeat: any) =>
          heartbeat.date_prelevement.split(' ')[1]
        );
        const data = sortedResponse.map((heartbeat: any) => heartbeat.data1);
  
        // Update the chart with new data
        this.ngZone.run(() => {
          if (this.chart) {
            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = data;
            this.chart.update();
          }
        });
      },
      (error: any) => {
        console.error('Error fetching real-time chart data:', error);
      }
    );
  }
  
  
  
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    const selectedDate: Date | null = event.value as Date | null;
  
    if (selectedDate) {
      // Set the selected date to the beginning of the day
      selectedDate.setHours(0, 0, 0, 0);
      this.selectedDate = selectedDate;
  
      // Update the chart with the selected date
      this.createChart();
    }
  }
  

}
