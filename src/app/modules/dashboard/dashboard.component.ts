import { Component, OnInit } from '@angular/core';
import { ClientBoardService } from 'src/app/services/client-board.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  client: any;
  public nom!: string;
  public prenom!: string;
  public mac!: string;
  public id!: string;
  public blood!: string;
  public Weight!: string;
  public sex!: string;
  public age!: string;
  public data1!: string;
  public data2!: string;
  public data3!: string;
  public datePrelevement!: string;
  user: User = new User();

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientBoard: ClientBoardService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.clientBoard.loadFromLocalStorage();
    this.nom = this.clientBoard.nom;
    this.prenom = this.clientBoard.prenom;
    this.mac = this.clientBoard.mac;
    this.id = this.clientBoard.id;

    // interval(2000).subscribe(()=>{
    //     const clientId = Number(this.clientBoard.id);
    //     this.clientService.getClientById(clientId).subscribe(
    //       (response: any) => {
    //         this.client = response;
    //         console.log(this.client)
    //       },
    //       (error) => {
    //         console.log('Error retrieving client:', error);
    //       }
    //     );
    // })

    // Initial data retrieval

    // Update the data every 5 seconds
    interval(4500).subscribe(() => {
      this.http
        .get<any[]>(`http://16.171.143.229:7777/getHeartbeatsByClient/${this.clientBoard.id}`)
        .subscribe(
          (response: any[]) => {
            if (response.length > 0) {
              // Sort the response array by date in descending order
              response.sort((a, b) => new Date(b.date_prelevement).getTime() - new Date(a.date_prelevement).getTime());

              const latestHeartbeat = response[0]; // Get the first element (latest heartbeat)

              // console.log('Latest Heartbeat:', latestHeartbeat);

              this.data1 = latestHeartbeat.data1;
              // console.log("data1", this.data1);

              this.data2 = latestHeartbeat.data2;
              // console.log("data2", this.data2);

              this.data3 = latestHeartbeat.data3;
              this.datePrelevement = latestHeartbeat.date_prelevement;

              const clientId = Number(this.clientBoard.id);
              this.clientService.getClientById(clientId).subscribe(
                (response: any) => {
                  this.client = response;
                  // console.log(this.client)
                  this.blood = this.client.blood;
                  this.Weight = this.client.weight;
                  this.age  = this.client.age;
                  this.sex = this.client.sex;

                },
                (error) => {
                  console.log('Error retrieving client:', error);
                }
              );

              this.router.navigate(['def']);
            } else {
              console.log('No heartbeats found');
            }
          },
          (error) => {
            console.error('Error retrieving heartbeats:', error);
          }
        );
    });
  }
}
