import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  client: Client = new Client();
  postService: any;
  returnButtonClicked = false;
  
  constructor(private clientservice: ClientService, private navigation: Router,private router: Router,private snackBar: MatSnackBar) {}
  ngOnInit(): void {
  
    if (window.history.state['client']) this.client = window.history.state['client']
    else this.navigation.navigate(['/def/clients']);

    if (this.client) {
      window.history.replaceState(null, '');
    }
  }
  saveClient() {
    console.log(this.client);
    if (!this.returnButtonClicked){
    this.clientservice.updateClient(this.client)
      .subscribe(
        response => {
          console.log('Enregistrement du client réussi :', response);
          this.showErrorMessage('successfully updated');

        },
        error => {
          console.error('Erreur lors de l\'enregistrement du client :', error);
          this.showErrorMessage('update failed : ' + error);

        }
      );
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
