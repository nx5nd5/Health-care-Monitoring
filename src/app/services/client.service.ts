import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private  apiUrl = "http://89.116.236.217:8080/mibandbackend";
  router: any;

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(`${this.apiUrl}/listClients`);
  }

  getClientById(id: number) {
    return this.http.get(`${this.apiUrl}/getClientById/${id}`);
  }

  deleteClientById(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteClient/${id}`, {
      responseType: 'text',
    });
  }
  postClient(client: Client): Observable<any> {
    const { id, ...body } = client;
    return this.http.post(`${this.apiUrl}/saveClient`, body, {
      responseType: 'text',
    });
  }
  updateClient(client: Client): Observable<any> {
    const ID = client.id;
    const { id, ...body } = client;

    return this.http.put(`${this.apiUrl}/updateClient/${ID}`, body, {
      responseType: 'text',
    });
  }
  AjouterClient(){
      this.router.navigate(["/def/CreateClient"])
  }

}
