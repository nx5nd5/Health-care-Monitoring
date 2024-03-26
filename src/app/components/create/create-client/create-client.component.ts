import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {
  client: Client = new Client();
  returnButtonClicked = false;

  constructor(private http: HttpClient, private clientservice: ClientService, private router: Router, private snackBar: MatSnackBar) {}

  saveClient() {
    console.log(this.client);
    if (!this.returnButtonClicked) {
      this.clientservice.postClient(this.client)
        .subscribe(
          response => {
            console.log('Enregistrement du client réussi :', response);
            this.showErrorMessage('Successful profile registration');

          },
          error => {
            console.error('Erreur lors de l\'enregistrement du client :', error);
            this.showErrorMessage('Error when saving profile : ' + error);
        
          }
        );
      this.client = new Client;

    }
  }

  returnClicked() {
    this.returnButtonClicked = true;
    this.router.navigate(["/def/clients"])
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
