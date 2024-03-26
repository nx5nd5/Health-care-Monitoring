import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClientBoardService {
  public nom!: string;
  public prenom!: string;
  public mac!: string;
  public id!: string;
  public blood!: string;
  public Weight!: string;
  public sex!: string;
  public age!: string;

  constructor() {
    this.loadFromLocalStorage(); // Charger les données depuis le stockage local lors de l'initialisation du service
  }

  saveToLocalStorage() {
    localStorage.setItem('nom', this.nom);
    localStorage.setItem('prenom', this.prenom);
    localStorage.setItem('mac', this.mac);
    localStorage.setItem('id', this.id);
    // localStorage.setItem('blood', this.blood);
    // localStorage.setItem('Weight', this.Weight);
    // localStorage.setItem('age', this.age);
    // localStorage.setItem('sex', this.sex);
  }

  loadFromLocalStorage() {
    this.nom = localStorage.getItem('nom') || '';
    this.prenom = localStorage.getItem('prenom') || '';
    this.mac = localStorage.getItem('mac') || '';
    this.id = localStorage.getItem('id') || '';
    // this.blood = localStorage.getItem('blood') || '';
    // this.Weight = localStorage.getItem('Weight') || '';
    // this.sex = localStorage.getItem('sex') || '';
    // this.age = localStorage.getItem('age') || '';
  }
  setClientId(clientId: string) {
    this.id = clientId;
    this.saveToLocalStorage();
  }

  getClientId(): string {
    return this.id;
  }
  clearLocalStorage() {
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('mac');
    localStorage.removeItem('id');
    // localStorage.removeItem('blood');
    // localStorage.removeItem('Weight');
    // localStorage.removeItem('sex');
    // localStorage.removeItem('age');
  }
}
