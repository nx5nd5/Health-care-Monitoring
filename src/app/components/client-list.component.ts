import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from "@angular/router";
import { Client } from '../models/client.model';
import { ClientBoardService } from '../services/client-board.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  client: Client = new Client();
  page: number = 1;
  tableSize: number = 7;
  SearchText: string = ''; // Propriété pour stocker le texte de recherche
  filteredClients: any[] = [];


  constructor(
    private clientService: ClientService,
    private router: Router,
    private clientBoardService: ClientBoardService,
    private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (response: any) => {
        this.clients = response as Client[];
  
        // Initialise filteredClients avec la liste complète des clients
        this.filteredClients = this.clients.slice();
      },
      (error) => {
        console.log('Error retrieving clients:', error);
      }
    );
  }
  //********start pagination********* //
  onPageChange(page: number) {
    this.page = page;
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredClients.length / this.tableSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
  //********end pagination********* //
  updateClient(clientId: number) {
    // Logic for updating the client with the given clientId
    this.client = this.clients.find((cli: Client) => {
      return cli.id === clientId
    }) as Client

    if (this.client) {
      this.router.navigateByUrl('/def/UpdateClient', { state: { client: this.client } });
    }
  }
  //ajouter profile
  AjouterClient() {
    this.router.navigate(["/def/CreateClient"])
  }
  setClientId(clientId: number) {
    // Set the client ID in the client board service
    this.clientBoardService.setClientId(clientId.toString());
  }

  deleteClient(clientId: number) {

    this.clientService.deleteClientById(clientId)
      .subscribe(
        (response) => {
          this.clients = this.clients.filter((cli: Client) => {
            return cli.id != clientId;
          });
          console.log('Enregistrement du client réussi :', response);
          this.showErrorMessage('successfully delete');

        },
        error => {
          console.error('Erreur lors de l\'enregistrement du client :', error);
          this.showErrorMessage('delete failed : ' + error);


        }
      );
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  searchClient() {
    // Si le texte de recherche est vide, afficher tous les clients
  if (this.SearchText.trim() === '') {
    this.filteredClients = this.clients.slice();
  } else {
    // Sinon, filtre les clients en fonction du texte de recherche
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(this.SearchText.toLowerCase()) ||
      client.prenom.toLowerCase().includes(this.SearchText.toLowerCase())
    );
  }}
}