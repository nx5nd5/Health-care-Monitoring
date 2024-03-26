import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: any;
  
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getClientById(clientId).subscribe(
      (response: any) => {
        this.client = response;
      },
      (error) => {
        console.log('Error retrieving client:', error);
      }
    );
  }
}
