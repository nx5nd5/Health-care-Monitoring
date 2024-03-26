import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { ClientBoardService } from 'src/app/services/client-board.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./bootstrap.css','./style.scss','./login.component.css',  './responsive.css']
})
export class LoginComponent implements OnInit {
  public nom!:string;
  public prenom!:string
  public mac!:string
  public id!:string

  user:User = new User();

  constructor(private http: HttpClient,private router: Router,private ClientBoard: ClientBoardService,private authService: AuthService,    private snackBar: MatSnackBar
    ){

  }

  ngOnInit() {}

  login() {
    if (this.user.email === "admin@gmail.com" && this.user.mac === "aa:aa:aa") {
      // Admin login
      this.authService.setIsAdmin(true); // Set admin status based on the provided mac
      this.router.navigate(['/def']);
      this.authService.setIsLoggedIn(true);

    } else {
    this.http.get<User[]>(`http://16.171.143.229:7777/listClients`).subscribe(
      (response: any[]) => {
        const client = response.find((c) => c.mail === this.user.email && c.mac === this.user.mac);
        if (client) {
          // Client found, handle successful sign-in
          this.authService.setIsAdmin(false); // Set admin status as false for non-admin users
          console.log('Client found:', client);

          this.ClientBoard.nom = client.nom;
          this.ClientBoard.prenom = client.prenom;
          this.ClientBoard.mac = client.mac;
          this.ClientBoard.id = client.id;
          console.log(client.id)
          this.ClientBoard.saveToLocalStorage(); // Enregistrer les données dans le stockage local
          this.router.navigate(['/def/Dashboard']);
          // Perform further actions or redirect the user
          this.authService.setIsLoggedIn(true);

        } else {
          // Client not found, handle sign-in failure
          console.log('Client not found');
          this.showErrorMessage('Incorrect email or MAC');

          // Display an error message or perform other actions
        }
      },
      (error) => {
        // Handle the error
        console.error('Error retrieving clients:', error);
        // Display an error message or perform other error handling
        this.showErrorMessage('An error occurred while logging in');

      }
    );
  }
}
  //  console.log(this.user)
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
